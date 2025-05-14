
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ReflectionCardProps {
  title: string;
  content: string;
  icon: string;
  color: string;
}

const ReflectionCard: React.FC<ReflectionCardProps> = ({ title, icon, color, content }) => {
  return (
    <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
      <CardContent className="p-4">
        <p className={`flex items-center font-medium ${color} mb-2`}>
          <span className="mr-2">{icon}</span> {title}
        </p>
        <p className="text-white">{content}</p>
      </CardContent>
    </Card>
  );
};

export default ReflectionCard;
