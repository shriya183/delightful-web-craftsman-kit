
import React, { useState } from "react";
import { BeamsBackground } from "@/components/ui/beams-background";
import JournalPage from "@/components/journal/JournalPage";
import FutureSelectionView from "@/components/journal/FutureSelectionView";
import Sidebar from "@/components/dashboard/Sidebar";
import HomeView from "@/components/dashboard/HomeView";
import MessageInput from "@/components/dashboard/MessageInput";

const Dashboard: React.FC = () => {
  const [message, setMessage] = useState("");
  const [activeView, setActiveView] = useState<"home" | "journal" | "future">("future");
  
  return (
    <BeamsBackground intensity="medium" className="min-h-screen">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col h-screen">
          <div className="flex-1 overflow-auto p-4">
            <div className="max-w-4xl mx-auto">
              {activeView === "home" ? (
                <HomeView />
              ) : activeView === "journal" ? (
                <JournalPage />
              ) : (
                <FutureSelectionView />
              )}
            </div>
          </div>
          
          {/* Input Area */}
          {activeView === "home" && (
            <MessageInput message={message} setMessage={setMessage} />
          )}
        </div>
      </div>
    </BeamsBackground>
  );
};

export default Dashboard;
