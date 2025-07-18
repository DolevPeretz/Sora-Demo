"use client";
import { useGenerateImage } from "@/hooks/useGenerateImage";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ButtonSize from "./ButtonSize";
import ImageGrid from "./ImageGrid";
import { useAspect } from "@/hooks/useAspect";
import { usePreloadImages } from "@/hooks/usePreloadImages";
import { useScrollToSavedImage } from "@/hooks/useScrollRestoration";

function ListCard({ prompt }: { prompt: string }) {
  const { aspect, setAspect } = useAspect();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useGenerateImage(prompt);

  const { displayedImages, isLoading } = usePreloadImages(data?.pages);
  useScrollToSavedImage(!isLoading);

  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && status === "success") {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, status]);

  if (status === "pending") {
    return (
      <div className="flex justify-center items-center mt-4">
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
      <ImageGrid images={displayedImages} aspect={aspect} />

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
