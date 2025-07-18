import { useEffect, useState } from "react";
import { preloadImageBatch } from "@/utils/preloadImages";
import { ImageData } from "@/utils/type";

export function usePreloadImages(dataPages: ImageData[][] | undefined) {
  const [displayedImages, setDisplayedImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!dataPages) return;

      const allImages = dataPages.flat();
      setIsLoading(true);

      try {
        const { validImages } = await preloadImageBatch(allImages);
        setDisplayedImages(validImages);
      } catch (err) {
        console.error("Preload error:", err);
        setDisplayedImages(allImages); // fallback
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [dataPages?.length]);

  return {
    displayedImages,
    isLoading,
  };
}
