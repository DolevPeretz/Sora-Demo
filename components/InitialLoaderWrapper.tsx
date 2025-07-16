"use client";
import { useGenerateImage } from "@/hooks/useGenerateImage";
import { useQueryContext } from "@/context/QueryContext";
import { useEffect, useState } from "react";
import HomePage from "./HomePage";
import { preloadImages, ImageData } from "@/utils/preloadImages";

export default function InitialLoaderWrapper() {
  const { query } = useQueryContext();
  const { data, status } = useGenerateImage(query);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (status === "success" && data) {
      const images: ImageData[] = data.pages.flatMap((p) => p.data || []);
      preloadImages(images).then(() => setReady(true));
    }
  }, [status, data]);

  if (!ready || status === "pending") {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading images...
      </div>
    );
  }

  return <HomePage />;
}
