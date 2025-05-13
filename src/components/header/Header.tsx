
import React from "react";
import { Link } from "react-router-dom";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const { user, signOut } = useSupabaseAuth();

  return (
    <header className="absolute top-8 left-16 right-16 z-50 py-4 px-6 flex justify-between items-center">
      <Link to="/" className="flex items-center space-x-2">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 0C5.82 0 0 5.82 0 13C0 20.18 5.82 26 13 26C20.18 26 26 20.18 26 13C26 5.82 20.18 0 13 0ZM13 23.4C7.254 23.4 2.6 18.746 2.6 13C2.6 7.254 7.254 2.6 13 2.6C18.746 2.6 23.4 7.254 23.4 13C23.4 18.746 18.746 23.4 13 23.4Z" fill="white" />
          <path d="M13 7.8C10.1669 7.8 7.8 10.1669 7.8 13C7.8 15.8331 10.1669 18.2 13 18.2C15.8331 18.2 18.2 15.8331 18.2 13C18.2 10.1669 15.8331 7.8 13 7.8Z" fill="white" />
        </svg>
      </Link>

      <div className="flex items-center space-x-4">
        {user ? (
          <Button 
            variant="outline" 
            onClick={signOut} 
            className="text-white border-white/20 hover:bg-white/10"
          >
            Sign Out
          </Button>
        ) : (
          <div className="space-x-2">
            <Button 
              variant="outline" 
              asChild 
              className="text-white border-white/20 hover:bg-white/10"
            >
              <Link to="/login">Sign In</Link>
            </Button>
            <Button 
              asChild 
              className="bg-[rgba(65,105,225,1)] hover:bg-[rgba(65,105,225,0.8)]"
            >
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
