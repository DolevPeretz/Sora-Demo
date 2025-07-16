"use client";
import {
  FaImage,
  FaPlus,
  FaQuestion,
  FaTrashAlt,
  FaArrowUp,
} from "react-icons/fa";
import { useState } from "react";
import { useQueryContext } from "@/context/QueryContext";

function SearchBar() {
  const { setQuery } = useQueryContext();
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    if (inputValue.trim() === "") return;
    setQuery(inputValue.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="fixed bottom-4 left-5 right-4 mx-auto w-[60%] max-w-5xl bg-white/15 text-white p-4 rounded-2xl flex flex-col gap-3 shadow-lg backdrop-blur-md z-50">
      <div className="flex items-center gap-2 px-4 py-2 rounded-full w-full">
        <FaPlus />
        <input
          type="search"
          placeholder="Describe your image..."
          className="bg-transparent outline-none w-full text-white placeholder-white"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          value={inputValue}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button className="bg-[#ffffff1a] px-4 py-2 rounded-full flex items-center gap-2 text-sm">
          <FaImage />
          Image
        </button>
        <button className="bg-[#ffffff1a] px-4 py-2 rounded-full text-sm">
          2:3
        </button>
        <button className="bg-[#ffffff1a] px-4 py-2 rounded-full text-sm">
          2v
        </button>
        <button className="bg-[#ffffff1a] px-4 py-2 rounded-full text-sm">
          <FaTrashAlt />
        </button>
        <button className="bg-[#ffffff1a] px-4 py-2 rounded-full text-sm">
          <FaQuestion />
        </button>

        <button
          className="ml-auto bg-[#ffffff1a] px-4 py-2 rounded-full text-sm"
          onClick={handleSearch}
          disabled={inputValue.trim() === ""}
        >
          <FaArrowUp />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
