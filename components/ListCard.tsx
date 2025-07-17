"use client";
import { useQueryContext } from "@/context/QueryContext";
import { useGenerateImage } from "@/hooks/useGenerateImage";
import { useEffect, useRef, useState, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import ButtonSize from "./ButtonSize";
import ImageGrid from "./ImageGrid";

function ListCard() {
  const [aspect, setAspect] = useState<
    "aspect-square" | "aspect-video" | "aspect-[9/16]"
  >("aspect-square");

  const { query } = useQueryContext();
  const prompt = query;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useGenerateImage(prompt);

  const { ref, inView } = useInView({ threshold: 0.1 });

  // useEffect(() => {
  //   if (data && data.pages.length > 0) {
  //     const firstPageImages = data.pages[0]; // קבלת התמונה הראשונה מהדף הראשון
  //     if (firstPageImages && firstPageImages.length > 0) {
  //       const img = new Image();
  //       img.src = firstPageImages[0]?.url; // נטען את התמונה הראשונה מראש
  //     }
  //   }
  // }, [data]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && status === "success") {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, status]);

  const images = data?.pages.flat() || [];

  if (status === "pending") {
    return (
      <div className="h-screen w-full flex items-center justify-center text-white">
        <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (status === "error") {
    return <div className="text-red-500">Error loading images</div>;
  }

  return (
    <div className="p-4">
      <ButtonSize aspect={aspect} onChange={setAspect} />
      <ImageGrid images={images} aspect={aspect} />

      {hasNextPage && (
        <div ref={ref} className="text-center text-white mt-4">
          {isFetchingNextPage ? (
            <div className="flex justify-center items-center mt-6">
              <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            "Scroll to load more"
          )}
        </div>
      )}
    </div>
  );
}

export default ListCard;
