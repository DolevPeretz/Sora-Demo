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
