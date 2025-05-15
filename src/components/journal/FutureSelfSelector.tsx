
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const FutureSelfSelector = () => {
  const handleSelect = () => {
    toast({
      title: "Starting chat with your 1-Year Self",
      description: "Connecting you with your near-future self...",
    });
  };
  
  const handleLoginRequired = () => {
    toast({
      title: "Login Required",
      description: "Please login to chat with your distant future self",
      variant: "destructive",
    });
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white">Choose Your Future Self</h2>
        <p className="text-gray-300 mt-2">Select a perspective to chat with</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1-Year Self Card */}
        <Card className="bg-black/20 backdrop-blur-lg border border-white/10 transition-all hover:border-white/30 hover:bg-black/30 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-white mb-3">1-Year Self</h3>
            <p className="text-gray-300 mb-6">
              Chat with your self from just one year in the future. Perfect for near-term decisions and practical advice.
            </p>
            <Button 
              variant="default" 
              className="w-full bg-[rgba(65,105,225,1)] hover:bg-[rgba(65,105,225,0.8)]"
              onClick={handleSelect}
            >
              Select
            </Button>
          </CardContent>
        </Card>
        
        {/* 5-Year Self Card */}
        <Card className="bg-black/20 backdrop-blur-lg border border-white/10 transition-all hover:border-white/30 hover:bg-black/30 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-white mb-3">5-Year Self</h3>
            <p className="text-gray-300 mb-6">
              Gain perspective from your mid-term future self. Ideal for career changes and significant life decisions.
            </p>
            <Button 
              variant="outline" 
              className="w-full text-gray-400 border-gray-700 hover:bg-gray-800/50"
              disabled
              onClick={handleLoginRequired}
            >
              <LogIn className="mr-2 h-4 w-4" /> Login Required
            </Button>
          </CardContent>
        </Card>
        
        {/* 20-Year Self Card */}
        <Card className="bg-black/20 backdrop-blur-lg border border-white/10 transition-all hover:border-white/30 hover:bg-black/30 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-white mb-3">20-Year Self</h3>
            <p className="text-gray-300 mb-6">
              Wisdom from your long-term future self. Perfect for understanding what truly matters in life and their values.
            </p>
            <Button 
              variant="outline" 
              className="w-full text-gray-400 border-gray-700 hover:bg-gray-800/50"
              disabled
              onClick={handleLoginRequired}
            >
              <LogIn className="mr-2 h-4 w-4" /> Login Required
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FutureSelfSelector;
