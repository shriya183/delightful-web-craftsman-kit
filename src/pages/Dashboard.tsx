
import React, { useState } from "react";
import { BeamsBackground } from "@/components/ui/beams-background";
import Header from "@/components/header/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SendHorizontal, Plus, Search, Globe, XCircle } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import JournalPage from "@/components/journal/JournalPage";

const Dashboard: React.FC = () => {
  const [message, setMessage] = useState("");
  const [activeView, setActiveView] = useState<"home" | "journal">("home");
  
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  
  return <BeamsBackground intensity="medium" className="min-h-screen">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-black/20 backdrop-blur-lg border-r border-white/10 flex flex-col h-screen">
          <div className="p-4 flex items-center">
            <div className="flex items-center space-x-2">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 0C5.82 0 0 5.82 0 13C0 20.18 5.82 26 13 26C20.18 26 26 20.18 26 13C26 5.82 20.18 0 13 0ZM13 23.4C7.254 23.4 2.6 18.746 2.6 13C2.6 7.254 7.254 2.6 13 2.6C18.746 2.6 23.4 7.254 23.4 13C23.4 18.746 18.746 23.4 13 23.4Z" fill="white" />
                <path d="M13 7.8C10.1669 7.8 7.8 10.1669 7.8 13C7.8 15.8331 10.1669 18.2 13 18.2C15.8331 18.2 18.2 15.8331 18.2 13C18.2 10.1669 15.8331 7.8 13 7.8Z" fill="white" />
              </svg>
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
              {/* Journal tab removed from here */}
            </div>
          </div>
          
          <div className="px-4 py-2">
            <h3 className="text-sm text-gray-400 mb-2">Your conversations</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto px-2">
            {/* Conversation List */}
            <div className="space-y-1">
              {["Create Html Game Environment", "Apply To Leave For Emergency", "What Is UI UX Design?", "Create POS System", "What Is UX Audit?", "Create Chatbot GPT"].map((title, index) => <Button key={index} variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5 px-2 py-1.5 h-auto">
                  <span className="mr-2">💬</span>
                  <span className="truncate text-left">{title}</span>
                </Button>)}
            </div>
            
            <div className="mt-4 px-2">
              <p className="text-xs text-gray-400 mb-2">Last 7 Days</p>
            </div>
            
            <div className="space-y-1">
              {["Crypto Lending App Name", "Operator Grammar Types"].map((title, index) => <Button key={index} variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5 px-2 py-1.5 h-auto">
                  <span className="mr-2">💬</span>
                  <span className="truncate text-left">{title}</span>
                </Button>)}
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
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col h-screen">
          <Header />
          
          <div className="flex-1 overflow-auto p-4">
            <div className="max-w-4xl mx-auto">
              {activeView === "home" ? (
                <>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white">Good day! How may I assist you today?</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Feature Cards Row 1 */}
                    <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
                      <CardContent className="p-0">
                        <div className="p-4 flex items-start">
                          <div className="w-12 h-12 flex items-center justify-center rounded-md bg-black/30 text-white">
                            <Globe size={24} />
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-white">Celebrate</h3>
                            <p className="text-sm text-gray-400">Recognize your effort or achievement today.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
                      <CardContent className="p-0">
                        <div className="grid grid-cols-5">
                          <div className="col-span-1 border-r border-white/10 p-4 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-purple-300/30 flex items-center justify-center">
                              <span className="text-purple-200">E</span>
                            </div>
                          </div>
                          <div className="col-span-3 p-4">
                            <h3 className="text-white font-medium">"Explain"</h3>
                            <p className="text-sm text-gray-400">Quantum computing in simple terms</p>
                          </div>
                          <div className="col-span-1 border-l border-white/10 flex items-center justify-center">
                            <Button variant="ghost" className="h-full w-full text-gray-400">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Feature Cards Row 2 */}
                    <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
                      <CardContent className="p-0">
                        <div className="p-4 flex items-start">
                          <div className="w-12 h-12 flex items-center justify-center rounded-md bg-black/30 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-white">Warning</h3>
                            <p className="text-sm text-gray-400">Reflect on a risk or blind spot coming up.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
                      <CardContent className="p-0">
                        <div className="grid grid-cols-5">
                          <div className="col-span-1 border-r border-white/10 p-4 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-orange-300/30 flex items-center justify-center">
                              <span className="text-orange-200">R</span>
                            </div>
                          </div>
                          <div className="col-span-3 p-4">
                            <h3 className="text-white font-medium">"Remember"</h3>
                            <p className="text-sm text-gray-400">Saves your conversation history</p>
                          </div>
                          <div className="col-span-1 border-l border-white/10 flex items-center justify-center">
                            <Button variant="ghost" className="h-full w-full text-gray-400">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Feature Cards Row 3 */}
                    <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
                      <CardContent className="p-0">
                        <div className="p-4 flex items-start">
                          <div className="w-12 h-12 flex items-center justify-center rounded-md bg-black/30 text-white">
                            <XCircle size={24} />
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-white">Nudge</h3>
                            <p className="text-sm text-gray-400">Suggest a micro next step for your journey.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
                      <CardContent className="p-0">
                        <div className="grid grid-cols-5">
                          <div className="col-span-1 border-r border-white/10 p-4 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-red-300/30 flex items-center justify-center">
                              <span className="text-red-200">M</span>
                            </div>
                          </div>
                          <div className="col-span-3 p-4">
                            <h3 className="text-white font-medium">"May"</h3>
                            <p className="text-sm text-gray-400">Occasionally generate incorrect information</p>
                          </div>
                          <div className="col-span-1 border-l border-white/10 flex items-center justify-center">
                            <Button variant="ghost" className="h-full w-full text-gray-400">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              ) : (
                <JournalPage />
              )}
            </div>
          </div>
          
          {/* Input Area */}
          {activeView === "home" && (
            <div className="p-4 border-t border-white/10">
              <div className="max-w-3xl mx-auto">
                <div className="relative">
                  <Input placeholder="What's in your mind?..." className="pr-12 py-6 bg-black/30 border-white/10 text-white rounded-full" value={message} onChange={handleMessageChange} />
                  <Button size="icon" className="absolute right-1 top-1 bottom-1 bg-[rgba(65,105,225,1)] hover:bg-[rgba(65,105,225,0.8)] rounded-full h-auto">
                    <SendHorizontal className="h-5 w-5" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </BeamsBackground>;
};
export default Dashboard;
