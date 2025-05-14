
import React from "react";
import ReflectionCard from "./ReflectionCard";

interface Reflection {
  id?: string;
  entry_id?: string;
  type: 'celebration' | 'warning' | 'nudge';
  content: string;
}

interface ReflectionsListProps {
  reflections: Reflection[];
}

const ReflectionsList: React.FC<ReflectionsListProps> = ({ reflections }) => {
  // Get reflection by type
  const getReflectionByType = (type: 'celebration' | 'warning' | 'nudge') => {
    return reflections.find(r => r.type === type);
  };

  // Only render if we have reflections
  if (reflections.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 mt-8">
      <h3 className="text-xl font-medium text-white mb-4">Mirror Moments</h3>
      
      {getReflectionByType('celebration') && (
        <ReflectionCard 
          type="celebration" 
          content={getReflectionByType('celebration')!.content} 
        />
      )}
      
      {getReflectionByType('warning') && (
        <ReflectionCard 
          type="warning" 
          content={getReflectionByType('warning')!.content} 
        />
      )}
      
      {getReflectionByType('nudge') && (
        <ReflectionCard 
          type="nudge" 
          content={getReflectionByType('nudge')!.content} 
        />
      )}
    </div>
  );
};

export default ReflectionsList;
