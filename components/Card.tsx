import Image from "next/image";
import { ImageData } from "@/utils/preloadImages";

function Card({ img }: { img: ImageData }) {
  const isVideo = img.content_type?.startsWith("video");

  return (
    <div className="bg-white/10 rounded-xl overflow-hidden border border-white/10">
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
}

export default Card;
