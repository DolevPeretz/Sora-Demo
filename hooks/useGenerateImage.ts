"use client";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useGenerateImage(prompt: string) {
  console.log("Fetching for prompt:", prompt);

  return useInfiniteQuery({
    queryKey: ["images", prompt],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, page: pageParam }),
      });

      const text = await response.text();
      const data = JSON.parse(text);

      if (!response.ok) {
        console.error("API call failed:", text);
        throw new Error("Failed to generate image");
      }

      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (_lastPage, _pages, lastPageIndex) => lastPageIndex + 1,
    staleTime: 1000 * 60,
  });
}
