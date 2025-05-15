
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";

interface MessageInputProps {
  message: string;
  setMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ message, setMessage }) => {
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="p-4 border-t border-white/10">
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          <Input 
            placeholder="What's in your mind?..." 
            className="pr-12 py-6 bg-black/30 border-white/10 text-white rounded-full" 
            value={message} 
            onChange={handleMessageChange} 
          />
          <Button 
            size="icon" 
            className="absolute right-1 top-1 bottom-1 bg-[rgba(65,105,225,1)] hover:bg-[rgba(65,105,225,0.8)] rounded-full h-auto"
          >
            <SendHorizontal className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
