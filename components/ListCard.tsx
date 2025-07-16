"use client";
import { useQueryContext } from "@/context/QueryContext";
import Card from "./Card";
import { useGenerateImage } from "@/hooks/useGenerateImage";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { preloadImages, ImageData } from "@/utils/preloadImages";
import ButtonSize from "./ButtonSize";

function ListCard() {
  const [aspect, setAspect] = useState<
    "aspect-square" | "aspect-video" | "aspect-[9/16]"
  >("aspect-square");
  const { query } = useQueryContext();
  const prompt = query;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isSuccess,
  } = useGenerateImage(prompt);

  const [loadedPages, setLoadedPages] = useState<Set<number>>(new Set());
  const { ref, inView } = useInView({ threshold: 1 });
  const hasPrefetched = useRef(false);

  // Preload images when data is ready
  useEffect(() => {
    if (status === "success") {
      const allPages = data?.pages || [];

      allPages.forEach((page, index) => {
        if (!loadedPages.has(index) && page?.length > 0) {
          preloadImages(page).then(() => {
            setLoadedPages((prev) => new Set(prev).add(index));
          });
        }
      });
    }
  }, [data, loadedPages, status]);

  // Load more when in view
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  // Prefetch next page once initial load succeeds
  useEffect(() => {
    if (isSuccess && hasNextPage && !hasPrefetched.current) {
      hasPrefetched.current = true;
      fetchNextPage();
    }
  }, [isSuccess, hasNextPage]);

  // Loading spinner before anything loaded
  if (status === "pending" || loadedPages.size === 0)
    return (
      <div className="h-screen w-full flex items-center justify-center text-white">
        <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (status === "error")
    return <div className="text-red-500">Error loading images</div>;

  // Gather all images from loaded pages
  const images =
    data?.pages
      .map((page, index) => (loadedPages.has(index) ? page : []))
      .flat() || [];

  return (
    <div className="p-4">
      <ButtonSize aspect={aspect} onChange={setAspect} />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img: ImageData, index: number) => (
          <Card img={img} key={index} aspect={aspect} />
        ))}
      </div>

      {hasNextPage && (
        <div ref={ref} className="text-center text-white mt-4">
          {isFetchingNextPage ? (
            <div className="flex justify-center items-center mt-6">
              <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            "Scroll down to load more"
          )}
        </div>
      )}
    </div>
  );
}

export default ListCard;
