"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FaPlus, FaArrowUp } from "react-icons/fa";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initial = searchParams.get("prompt") || "";
  const [inputValue, setInputValue] = useState(initial);

  const handleSearch = () => {
    const trimmed = inputValue.trim();
    const params = new URLSearchParams(searchParams);

    if (trimmed) params.set("prompt", trimmed);
    else params.delete("prompt");

    const qs = params.toString();
    router.replace("/" + (qs ? `?${qs}` : ""));
  };

  return (
    <div className="fixed bottom-4 left-70 right-4 mx-auto w-[60%] max-w-5xl bg-white/15 text-white p-4 rounded-2xl flex flex-col gap-3 shadow-lg backdrop-blur-md z-50">
      <div className="flex items-center gap-2 px-4 py-2 rounded-full w-full">
        <FaPlus />
        <input
          type="search"
          placeholder="Describe your image..."
          className="bg-transparent outline-none w-full text-white placeholder-white"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          value={inputValue}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          className="ml-auto bg-[#ffffff1a] px-4 py-2 rounded-full text-sm"
          onClick={handleSearch}
          disabled={!inputValue.trim()}
        >
          <FaArrowUp />
        </button>
      </div>
    </div>
  );
}
