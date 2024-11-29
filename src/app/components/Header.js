// src/components/Header.js
import React from "react";

const Header = () => {
  return (
    <header className="ml-20 bg-black border-b border-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="font-nunito text-white  font-thin  text-xl cursor-pointer">
          Match Stats
        </div>
      </div>
    </header>
  );
};

export default Header;
