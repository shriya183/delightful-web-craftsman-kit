
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ReflectionCardProps {
  type: 'celebration' | 'warning' | 'nudge';
  content: string;
}

const ReflectionCard: React.FC<ReflectionCardProps> = ({ type, content }) => {
  // Configuration for different reflection types
  const reflectionConfig = {
    celebration: {
      icon: '✨',
      title: 'Celebration',
      textColor: 'text-amber-300'
    },
    warning: {
      icon: '⚡',
      title: 'Warning',
      textColor: 'text-orange-300'
    },
    nudge: {
      icon: '🌱',
      title: 'Nudge',
      textColor: 'text-green-300'
    }
  };

  const { icon, title, textColor } = reflectionConfig[type];

  return (
    <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
      <CardContent className="p-4">
        <p className={`flex items-center font-medium ${textColor} mb-2`}>
          <span className="mr-2">{icon}</span> {title}
        </p>
        <p className="text-white">{content}</p>
      </CardContent>
    </Card>
  );
};

export default ReflectionCard;
