// // lib/fetchImages.ts
// import { ImageData } from "@/utils/preloadImages";

// export async function fetchImages(
//   prompt: string,
//   page: number = 1
// ): Promise<ImageData[]> {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/generate`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ prompt, page }),
//       cache: "force-cache",
//     }
//   );

//   if (!response.ok) {
//     const err = await response.text();
//     console.error("❌ FetchImages error:", err);
//     throw new Error("Failed to fetch images");
//   }

//   const data = await response.json();
//   return data;
// }

// lib/server/fetchImages.ts
export async function fetchInitialImages(prompt: string, page = 1) {
  const res = await fetch("https://fal.run/fal-ai/flux/schnell", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Key ${process.env.API_KEY}`,
    },
    body: JSON.stringify({
      prompt: `${prompt} page ${page}`,
      num_images: 3,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch initial images");
  }

  const data = await res.json();
  return data.images;
}
