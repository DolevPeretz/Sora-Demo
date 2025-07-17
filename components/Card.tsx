"use client";
import Head from "next/head";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ImageData } from "@/utils/preloadImages";
import React from "react";

type CardProps = {
  img: ImageData;
  aspect: "aspect-square" | "aspect-video" | "aspect-[9/16]";
  index: number;
};

const CardComponent = ({ img, aspect, index }: CardProps) => {
  const router = useRouter();
  const isVideo = img.content_type?.startsWith("video");

  const handleClick = () => {
    sessionStorage.setItem("scrollY", window.scrollY.toString());
    sessionStorage.setItem("selectedImage", JSON.stringify(img));
    router.push(`/image/${index}`);
  };

  return (
    <div
      className={`cursor-pointer ${aspect}  overflow-hidden rounded-xl`}
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
        <Image
          src={img.url}
          width={img.width || 512}
          height={img.height || 512}
          alt="Generated image"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      )}
    </div>
  );
};

const Card = React.memo(CardComponent);

export default Card;
