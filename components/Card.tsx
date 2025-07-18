"use client";

import { useRouter } from "next/navigation";
import { ImageData } from "@/utils/type";
import React, { useState, useEffect } from "react";

type CardProps = {
  img: ImageData;
  aspect: "aspect-square" | "aspect-video" | "aspect-[9/16]";
  index: number;
};

const CardComponent = ({ img, aspect, index }: CardProps) => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const isVideo = img.content_type?.startsWith("video");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setIsNavigating(true);
    sessionStorage.setItem("scrollIndex", String(index));
    sessionStorage.setItem("scrollY", String(window.scrollY));
    sessionStorage.setItem("selectedImage", JSON.stringify(img));
    router.push(`/image/${index}`);
  };
  return (
    <div
      className={`cursor-pointer ${aspect} overflow-hidden rounded-xl transition-opacity duration-500 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
      id={`img-${index}`}
      onClick={handleClick}
    >
      {isNavigating && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
          <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {isVideo ? (
        <video
          src={img.url}
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          onMouseEnter={(e) => e.currentTarget.play()}
          onMouseLeave={(e) => e.currentTarget.pause()}
        />
      ) : (
        <img
          src={img.url}
          alt="Generated"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      )}
    </div>
  );
};

const Card = React.memo(CardComponent);

export default Card;
