"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function ImagePage() {
  const [imageData, setImageData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const img = sessionStorage.getItem("selectedImage");
    if (img) {
      setImageData(JSON.parse(img));
    } else {
      router.push("/");
    }
  }, [router]);

  if (!imageData) return null;

  const isVideo = imageData.content_type?.startsWith("video");

  const handleBackgroundClick = () => {
    router.back();
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
    >
      <div onClick={stopPropagation} className="max-w-4xl w-full">
        {isVideo ? (
          <video
            src={imageData.url}
            controls
            autoPlay
            className="w-full rounded-2xl shadow-lg"
          />
        ) : (
          <Image
            src={imageData.url}
            alt="Large view"
            width={imageData.width || 1024}
            height={imageData.height || 1024}
            className="w-full h-auto rounded-2xl shadow-lg"
          />
        )}
      </div>
    </div>
  );
}

export default ImagePage;
