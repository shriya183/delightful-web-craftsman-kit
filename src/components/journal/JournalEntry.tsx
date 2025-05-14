
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import ReflectionsList from "./ReflectionsList";
import { useJournalEntry } from "./hooks/useJournalEntry";

interface JournalEntryProps {
  existingEntry?: {
    id: string;
    content: string;
  };
}

const JournalEntry: React.FC<JournalEntryProps> = ({ existingEntry }) => {
  const {
    content,
    isSubmitting,
    reflections,
    handleContentChange,
    handleSave,
    loadReflections
  } = useJournalEntry(existingEntry);

  // Load reflections if we have an entry ID
  useEffect(() => {
    loadReflections();
  }, []);

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

      <ReflectionsList reflections={reflections} />
    </div>
  );
};

export default JournalEntry;
