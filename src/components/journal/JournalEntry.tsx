
import React, { useState } from "react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner"; // Corrected this import
import { Loader2 } from "lucide-react";

interface Reflection {
  id?: string;
  entry_id?: string;
  type: 'celebration' | 'warning' | 'nudge';
  content: string;
}

interface JournalEntryProps {
  existingEntry?: {
    id: string;
    content: string;
  };
}

const JournalEntry: React.FC<JournalEntryProps> = ({ existingEntry }) => {
  const { user } = useSupabaseAuth();
  const [content, setContent] = useState(existingEntry?.content || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [entryId, setEntryId] = useState<string | null>(existingEntry?.id || null);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
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

        setReflections(savedReflections as Reflection[] || []);
        toast("Journal entry saved with reflections");
      }
    } catch (error: any) {
      console.error("Error saving journal entry:", error);
      toast(error.message || "An error occurred while saving");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load reflections if we have an entry ID
  React.useEffect(() => {
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
          setReflections(data as Reflection[]);
        }
      }
    };
    
    loadReflections();
  }, [entryId]);

  // Get reflection by type
  const getReflectionByType = (type: 'celebration' | 'warning' | 'nudge') => {
    return reflections.find(r => r.type === type);
  };

  return (
    <div className="space-y-6">
      <Textarea
        placeholder="Write your journal entry here..."
        className="min-h-[200px] text-lg p-4 bg-black/20 backdrop-blur-lg border border-white/10 text-white"
        value={content}
        onChange={handleContentChange}
      />
      
      <Button
        onClick={handleSave}
        className="w-full bg-[rgba(65,105,225,1)] hover:bg-[rgba(65,105,225,0.8)]"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Reflections...
          </>
        ) : (
          'Save & Generate Reflections'
        )}
      </Button>

      {reflections.length > 0 && (
        <div className="space-y-4 mt-8">
          <h3 className="text-xl font-medium text-white mb-4">Mirror Moments</h3>
          
          {getReflectionByType('celebration') && (
            <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
              <CardContent className="p-4">
                <p className="flex items-center font-medium text-amber-300 mb-2">
                  <span className="mr-2">✨</span> Celebration
                </p>
                <p className="text-white">{getReflectionByType('celebration')?.content}</p>
              </CardContent>
            </Card>
          )}
          
          {getReflectionByType('warning') && (
            <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
              <CardContent className="p-4">
                <p className="flex items-center font-medium text-orange-300 mb-2">
                  <span className="mr-2">⚡</span> Warning
                </p>
                <p className="text-white">{getReflectionByType('warning')?.content}</p>
              </CardContent>
            </Card>
          )}
          
          {getReflectionByType('nudge') && (
            <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
              <CardContent className="p-4">
                <p className="flex items-center font-medium text-green-300 mb-2">
                  <span className="mr-2">🌱</span> Nudge
                </p>
                <p className="text-white">{getReflectionByType('nudge')?.content}</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default JournalEntry;
