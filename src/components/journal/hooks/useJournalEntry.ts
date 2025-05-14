
import { useState } from "react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

export interface Reflection {
  id?: string;
  entry_id: string;
  type: 'celebration' | 'warning' | 'nudge';
  content: string;
  created_at?: string;
}

interface JournalEntryData {
  id?: string;
  content: string;
}

export const useJournalEntry = (existingEntry?: JournalEntryData) => {
  const { user } = useSupabaseAuth();
  const [content, setContent] = useState(existingEntry?.content || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [entryId, setEntryId] = useState<string | null>(existingEntry?.id || null);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const loadReflections = async () => {
    if (entryId) {
      const { data, error } = await supabase
        .from('reflections')
        .select('*')
        .eq('entry_id', entryId);
        
      if (error) {
        console.error('Error loading reflections:', error);
        return;
      }
      
      if (data) {
        // Ensure the type matches by casting
        setReflections(data as unknown as Reflection[]);
      }
    }
  };

  const handleSave = async () => {
    if (!user) {
      toast("You must be logged in to save entries");
      return;
    }

    if (!content.trim()) {
      toast("Journal entry cannot be empty");
      return;
    }

    setIsSubmitting(true);

    try {
      // Save or update the journal entry
      let id = entryId;
      if (!id) {
        // Create new entry
        const { data: entryData, error: entryError } = await supabase
          .from('journal_entries')
          .insert([{ user_id: user.id, content }])
          .select('id')
          .single();

        if (entryError) throw entryError;
        id = entryData.id;
        setEntryId(id);
      } else {
        // Update existing entry
        const { error: updateError } = await supabase
          .from('journal_entries')
          .update({ content, updated_at: new Date().toISOString() })
          .eq('id', id);

        if (updateError) throw updateError;
      }

      // Generate reflections using the edge function
      const { data: reflectionsResponse, error: reflectionsError } = await supabase.functions
        .invoke('generate-reflections', {
          body: { journalContent: content }
        });

      if (reflectionsError) throw reflectionsError;

      if (reflectionsResponse?.reflections) {
        // Delete existing reflections for this entry
        await supabase
          .from('reflections')
          .delete()
          .eq('entry_id', id);

        // Insert new reflections 
        const newReflections: Reflection[] = [
          { entry_id: id, type: 'celebration', content: reflectionsResponse.reflections.celebration },
          { entry_id: id, type: 'warning', content: reflectionsResponse.reflections.warning },
          { entry_id: id, type: 'nudge', content: reflectionsResponse.reflections.nudge }
        ];

        const { data: savedReflections, error: insertError } = await supabase
          .from('reflections')
          .insert(newReflections)
          .select();

        if (insertError) throw insertError;

        // Correctly cast the returned data
        if (savedReflections) {
          setReflections(savedReflections as unknown as Reflection[]);
        }
        toast("Journal entry saved with reflections");
      }
    } catch (error: any) {
      console.error("Error saving journal entry:", error);
      toast(error.message || "An error occurred while saving");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    content,
    isSubmitting,
    reflections,
    entryId,
    handleContentChange,
    handleSave,
    loadReflections
  };
};
