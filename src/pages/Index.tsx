
import React from "react";
import Hero from "@/components/hero/Hero";
import { BeamsBackground } from "@/components/ui/beams-background";

const Index: React.FC = () => {
  return (
    <BeamsBackground intensity="medium" className="min-h-screen">
      <main className="relative z-10">
        <Hero />
      </main>
    </BeamsBackground>
  );
};

export default Index;
