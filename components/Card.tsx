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
  const isVideo = img.content_type?.startsWith("video");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    sessionStorage.setItem("scrollIndex", String(index)); // לשחזור לפי ID
    sessionStorage.setItem("scrollY", String(window.scrollY)); // גיבוי אם לא נמצא ID
    sessionStorage.setItem("selectedImage", JSON.stringify(img)); // לשימוש בדף התמונה
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
