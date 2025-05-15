
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import Logo from "@/components/Logo";

interface SidebarProps {
  activeView: string;
  setActiveView: (view: "home" | "journal" | "future") => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  return (
    <div className="w-80 bg-black/20 backdrop-blur-lg border-r border-white/10 flex flex-col h-screen">
      <div className="p-4 flex items-center">
        <div className="flex items-center space-x-2">
          <Logo />
          <span className="font-bold text-xl text-white">Velum</span>
        </div>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
      
      <div className="px-4 py-3">
        <Button 
          variant="default" 
          className="w-full flex gap-2 bg-[rgba(65,105,225,1)] hover:bg-[rgba(65,105,225,0.8)]"
          onClick={() => setActiveView("journal")}
        >
          <Plus size={16} /> New journal entry
        </Button>
        
        <div className="relative mt-3">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input placeholder="Search conversations..." className="pl-8 bg-black/30 border-white/10 text-white" />
        </div>
      </div>
      
      <div className="px-4 py-2">
        <h3 className="text-sm text-gray-400 mb-2">Navigation</h3>
        <div className="space-y-1">
          <Button 
            variant={activeView === "home" ? "secondary" : "ghost"} 
            className="w-full justify-start text-gray-300 hover:text-white"
            onClick={() => setActiveView("home")}
          >
            Home
          </Button>
          <Button 
            variant={activeView === "future" ? "secondary" : "ghost"} 
            className="w-full justify-start text-gray-300 hover:text-white"
            onClick={() => setActiveView("future")}
          >
            Future Self
          </Button>
        </div>
      </div>
      
      <div className="px-4 py-2">
        <h3 className="text-sm text-gray-400 mb-2">Your conversations</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto px-2">
        {/* Conversation List */}
        <div className="space-y-1">
          {["Create Html Game Environment", "Apply To Leave For Emergency", "What Is UI UX Design?", "Create POS System", "What Is UX Audit?", "Create Chatbot GPT"].map((title, index) => (
            <Button 
              key={index} 
              variant="ghost" 
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5 px-2 py-1.5 h-auto"
            >
              <span className="mr-2">💬</span>
              <span className="truncate text-left">{title}</span>
            </Button>
          ))}
        </div>
        
        <div className="mt-4 px-2">
          <p className="text-xs text-gray-400 mb-2">Last 7 Days</p>
        </div>
        
        <div className="space-y-1">
          {["Crypto Lending App Name", "Operator Grammar Types"].map((title, index) => (
            <Button 
              key={index} 
              variant="ghost" 
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5 px-2 py-1.5 h-auto"
            >
              <span className="mr-2">💬</span>
              <span className="truncate text-left">{title}</span>
            </Button>
          ))}
        </div>
      </div>
      
      <div className="mt-auto border-t border-white/10 p-4">
        <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-white/5">
          <span className="mr-2">⚙️</span>
          <span>Settings</span>
        </Button>
        <div className="flex items-center mt-4 px-2">
          <div className="w-8 h-8 rounded-full bg-white/20 overflow-hidden flex items-center justify-center text-xs">
            <span>AN</span>
          </div>
          <span className="ml-2 text-sm text-gray-300">User</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
