"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FaPlus, FaArrowUp } from "react-icons/fa";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initial = searchParams.get("prompt") || "";
  const [inputValue, setInputValue] = useState(initial);

  // סנכרון עם URL במקרה של חזרה/ניווט חיצוני
  useEffect(() => {
    setInputValue(searchParams.get("prompt") || "");
  }, [searchParams.get("prompt")]);

  // debounce של 500ms
  useEffect(() => {
    const handler = setTimeout(() => {
      const trimmed = inputValue.trim();
      const current = searchParams.get("prompt") || "";

      if (trimmed !== current) {
        const params = new URLSearchParams(searchParams);

        if (trimmed) params.set("prompt", trimmed);
        else params.delete("prompt");

        const qs = params.toString();
        router.replace(`/` + (qs ? `?${qs}` : ""));
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue, searchParams, router]);

  return (
    <div className="fixed bottom-4 left-70 right-4 mx-auto w-[60%] max-w-5xl bg-white/15 text-white p-4 rounded-2xl flex flex-col gap-3 shadow-lg backdrop-blur-md z-50">
      <div className="flex items-center gap-2 px-4 py-2 rounded-full w-full">
        <FaPlus />
        <input
          type="search"
          placeholder="Describe your image..."
          className="bg-transparent outline-none w-full text-white placeholder-white"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {/* כפתורים לפי הצורך */}
        <button
          className="ml-auto bg-[#ffffff1a] px-4 py-2 rounded-full text-sm"
          onClick={() => {
            /* אפשר גם לחייב חיפוש ידני, אם רוצים */
          }}
          disabled={!inputValue.trim()}
        >
          <FaArrowUp />
        </button>
      </div>
    </div>
  );
}
