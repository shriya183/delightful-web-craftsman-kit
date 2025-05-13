
import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="absolute top-8 left-16 right-0 z-50 py-4 px-6 flex justify-between items-center">
      <Link to="/" className="flex items-center space-x-2">
        {/* Logo and text removed */}
      </Link>
    </header>
  );
};

export default Header;
