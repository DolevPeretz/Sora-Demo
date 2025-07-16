import { useInfiniteQuery } from "@tanstack/react-query";

export function useGenerateImage(prompt: string) {
  return useInfiniteQuery({
    queryKey: ["images", prompt],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, page: pageParam }),
      });
      console.log("🔁 Got response:", response.status);

      const text = await response.text(); // קודם תקראי כטקסט
      console.log("📦 Raw text:", text);

      const data = JSON.parse(text); // כאן תנסי לפענח

      console.log("✅ Parsed JSON:", data);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API call failed:", errorText);
        throw new Error("Failed to generate image");
      }
      // const data = await response.json();
      // console.log("DOLEV ", data);
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (_lastPage, _pages, lastPageIndex) => lastPageIndex + 1,
    staleTime: 1000 * 60,
  });
}
