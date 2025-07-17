import { useInfiniteQuery } from "@tanstack/react-query";
import { preloadImages } from "@/utils/preloadImages";

export function useGenerateImage(prompt: string) {
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

      // כאן נטען את כל התמונות לפני שמחזירים את הנתונים
      // const urls = data.images.map((img: any) => img.url);
      // await preloadImages(urls);

      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (_lastPage, _pages, lastPageIndex) => lastPageIndex + 1,
    staleTime: 1000 * 60,
  });
}
