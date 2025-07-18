export type ImageData = {
  url: string;
  width: number;
  height: number;
  content_type: string;
};

export async function preloadImageBatch(
  images: ImageData[]
): Promise<{ validImages: ImageData[]; loadedCount: number }> {
  const preloadPromises = images.map(
    (image) =>
      new Promise<ImageData | null>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(image);
        img.onerror = () => resolve(null);
        img.src = image.url;
      })
  );

  const results = await Promise.all(preloadPromises);
  const validImages = results.filter((img): img is ImageData => img !== null);

  return {
    validImages,
    loadedCount: validImages.length,
  };
}
