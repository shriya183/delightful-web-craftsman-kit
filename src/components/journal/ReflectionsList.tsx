
import React from "react";
import ReflectionCard from "./ReflectionCard";
import { Reflection } from "./hooks/useJournalEntry";

interface ReflectionsListProps {
  reflections: Reflection[];
}

const ReflectionsList: React.FC<ReflectionsListProps> = ({ reflections }) => {
  if (reflections.length === 0) {
    return null;
  }

  const getReflectionByType = (type: 'celebration' | 'warning' | 'nudge') => {
    return reflections.find(r => r.type === type);
  };

  const reflectionConfig = {
    celebration: {
      title: 'Celebration',
      icon: '✨',
      color: 'text-amber-300'
    },
    warning: {
      title: 'Warning',
      icon: '⚡',
      color: 'text-orange-300'
    },
    nudge: {
      title: 'Nudge',
      icon: '🌱',
      color: 'text-green-300'
    }
  };

  return (
    <div className="space-y-4 mt-8">
      <h3 className="text-xl font-medium text-white mb-4">Mirror Moments</h3>
      
      {getReflectionByType('celebration') && (
        <ReflectionCard 
          title={reflectionConfig.celebration.title}
          icon={reflectionConfig.celebration.icon}
          color={reflectionConfig.celebration.color}
          content={getReflectionByType('celebration')?.content || ""}
        />
      )}
      
      {getReflectionByType('warning') && (
        <ReflectionCard 
          title={reflectionConfig.warning.title}
          icon={reflectionConfig.warning.icon}
          color={reflectionConfig.warning.color}
          content={getReflectionByType('warning')?.content || ""}
        />
      )}
      
      {getReflectionByType('nudge') && (
        <ReflectionCard 
          title={reflectionConfig.nudge.title}
          icon={reflectionConfig.nudge.icon}
          color={reflectionConfig.nudge.color}
          content={getReflectionByType('nudge')?.content || ""}
        />
      )}
    </div>
  );
};

export default ReflectionsList;
