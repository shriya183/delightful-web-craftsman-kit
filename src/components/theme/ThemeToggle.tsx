
import React from "react";
import { Moon, Sun } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useTheme } from "./ThemeProvider";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Toggle 
      variant="outline" 
      size="sm" 
      pressed={theme === "light"}
      onPressedChange={toggleTheme}
      aria-label="Toggle theme"
      className="border-white/10 bg-black/20 hover:bg-white/10 hover:text-white data-[state=on]:bg-white/10"
    >
      {theme === "light" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Toggle>
  );
};
