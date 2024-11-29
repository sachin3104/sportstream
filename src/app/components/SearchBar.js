// src/app/components/SearchBar.js
"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "./icons/SearchIcon";

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
    <div className="flex justify-center mt-8 items-center w-full">
      <div className="relative w-full max-w-3xl">
        {/* Search Input */}
        <input
          type="text"
          value={searchInput}
          onChange={handleTyping}
          onKeyDown={handleKeyDown} // Trigger search on Enter key press
          placeholder="Search for matches (e.g., 'India T20', 'South Africa')"
          className="bg-gray-800 text-white rounded-md p-3 pl-10 w-full placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-0 transition duration-200 border-[1px] border-transparent focus:border-[1px]"
        />

        {/* Search Icon Inside Input */}
        <FaSearch
          size={18}
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition duration-200 ${
            isTyping ? "text-orange-500" : "text-gray-500"
          }`}
        />
      </div>
    </div>
  );
  // return (
  //   <>
  //     <div className="w-[340px] h-[240px] px-8 rounded-2xl flex justify-center items-center bg-gradient-to-tr from-black to-gray-800 text-white shadow-lg">
  //       <Input
  //         label="Search"
  //         isClearable
  //         radius="md"
  //         value={searchInput}
  //         onChange={handleTyping}
  //         onKeyDown={handleKeyDown}
  //         classNames={{
  //           label: "text-black/50 dark:text-white/90",
  //           input: [
  //             "bg-transparent",
  //             "text-black/90 dark:text-white/90",
  //             "placeholder:text-default-700/50 dark:placeholder:text-white/60",
  //           ],
  //           innerWrapper: "bg-transparent",
  //           inputWrapper: [
  //             "shadow-xl",
  //             "bg-default-200/50",
  //             "dark:bg-default/60",
  //             "backdrop-blur-xl",
  //             "backdrop-saturate-200",
  //             "hover:bg-default-200/70",
  //             "dark:hover:bg-default/70",
  //             "group-data-[focus=true]:bg-default-200/50",
  //             "dark:group-data-[focus=true]:bg-default/60",
  //             "!cursor-text",
  //           ],
  //         }}
  //         placeholder="Type to search..."
  //         startContent={
  //           <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
  //         }
  //       />
  //     </div>
  //   </>
  // );
};

export default SearchBar;
