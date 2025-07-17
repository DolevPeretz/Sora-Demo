"use client";
import { useGenerateImage } from "@/hooks/useGenerateImage";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ButtonSize from "./ButtonSize";
import ImageGrid from "./ImageGrid";
import { ImageData } from "@/utils/preloadImages";

type Props = {
  prompt: string;
  initialImages: ImageData[];
};

function ListCard({ prompt, initialImages }: Props) {
  const [localPrompt, setLocalPrompt] = useState(prompt);
  const [aspect, setAspect] = useState<
    "aspect-square" | "aspect-video" | "aspect-[9/16]"
  >("aspect-square");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useGenerateImage(prompt);

  useEffect(() => {
    setLocalPrompt(prompt);
  }, [prompt]);

  const { ref, inView } = useInView({ threshold: 0.1 });

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
