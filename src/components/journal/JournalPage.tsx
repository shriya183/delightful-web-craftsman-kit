
import React, { useState, useEffect } from "react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { supabase } from "@/integrations/supabase/client";
import JournalEntry from "./JournalEntry";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const JournalPage: React.FC = () => {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const { user } = useSupabaseAuth();

  useEffect(() => {
    const loadEntries = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('journal_entries')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        setEntries(data || []);
      } catch (err: any) {
        toast.error(err.message || 'Error loading journal entries');
        console.error('Error loading entries:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadEntries();
  }, [user]);

  const handleNewEntry = () => {
    setSelectedEntryId(null);
  };

  const selectedEntry = selectedEntryId 
    ? entries.find(entry => entry.id === selectedEntryId)
    : null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="flex flex-col md:flex-row h-full gap-6">
      {/* Sidebar with entry list */}
      <div className="w-full md:w-64 space-y-4">
        <Button 
          onClick={handleNewEntry}
          className="w-full flex gap-2 bg-[rgba(65,105,225,1)] hover:bg-[rgba(65,105,225,0.8)]"
        >
          <Plus size={16} /> New Entry
        </Button>
        
        <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
          {loading ? (
            <div className="flex justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin text-white" />
            </div>
          ) : entries.length === 0 ? (
            <p className="text-center text-gray-400 p-4">No journal entries yet.</p>
          ) : (
            entries.map(entry => (
              <Card 
                key={entry.id}
                className={`p-3 cursor-pointer transition-colors ${
                  selectedEntryId === entry.id 
                    ? 'bg-[rgba(65,105,225,0.3)] backdrop-blur-lg border border-white/20' 
                    : 'bg-black/20 backdrop-blur-lg border border-white/10 hover:bg-black/30'
                }`}
                onClick={() => setSelectedEntryId(entry.id)}
              >
                <p className="text-sm text-gray-300 mb-1">{formatDate(entry.created_at)}</p>
                <p className="text-white truncate">
                  {entry.content.substring(0, 50)}
                  {entry.content.length > 50 ? '...' : ''}
                </p>
              </Card>
            ))
          )}
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-1">
        <JournalEntry existingEntry={selectedEntry} />
      </div>
    </div>
  );
};

export default JournalPage;
