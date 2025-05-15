
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, XCircle } from "lucide-react";

const HomeView: React.FC = () => {
  return (
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
  );
};

export default HomeView;
