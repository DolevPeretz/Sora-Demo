import React from "react";
import Card from "./Card";
import { ImageData } from "@/utils/type";

type Props = {
  images: ImageData[];
  aspect: "aspect-square" | "aspect-video" | "aspect-[9/16]";
};

const ImageGrid = React.memo(({ images, aspect }: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
      {images.map((img, index) => (
        <Card key={index} img={img} aspect={aspect} index={index} />
      ))}
    </div>
  );
});

ImageGrid.displayName = "ImageGrid";
export default ImageGrid;
