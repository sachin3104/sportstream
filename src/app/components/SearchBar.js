// src/app/components/SearchBar.js
"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    // Trigger the search function passed in props
    onSearch(searchInput);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleTyping = (event) => {
    handleInputChange(event);
    setIsTyping(event.target.value !== "");
  };

  return (
    <div className="flex justify-center  items-center w-full">
      <div className="w-full relative max-w-3xl">
        {/* Search Input */}
        <input
          type="text"
          value={searchInput}
          onChange={handleTyping}
          onKeyDown={handleKeyDown} // Trigger search on Enter key press
          placeholder="Search for matches (e.g., 'India T20', 'South Africa')"
          className="bg-transparent  font-nunito text-white  font-thin  rounded-lg p-3 pl-10 w-full placeholder-gray-400 border border-gray-800 focus:border-gray-500  focus:outline-none "
        />

        {/* Search Icon Inside Input */}
        <FaSearch
          size={18}
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition duration-200 ${
            isTyping ? "text-[#90ee90]" : "text-gray-500"
          }`}
        />
      </div>
    </div>
  );
};

export default SearchBar;
