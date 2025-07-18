"use client";

export type AspectRatio = "aspect-square" | "aspect-video" | "aspect-[9/16]";

type ButtonSizeProps = {
  aspect: AspectRatio;
  onChange: (value: AspectRatio) => void;
};

function ButtonSize({ aspect, onChange }: ButtonSizeProps) {
  return (
    <div className="flex gap-4 justify-center my-6">
      <button
        onClick={() => onChange("aspect-[9/16]")}
        className={`px-4 py-2 rounded-full text-sm border ${
          aspect === "aspect-[9/16]"
            ? "bg-white text-black"
            : "bg-white/10 text-white"
        }`}
      >
        9:16
      </button>
      <button
        onClick={() => onChange("aspect-square")}
        className={`px-4 py-2 rounded-full text-sm border ${
          aspect === "aspect-square"
            ? "bg-white text-black"
            : "bg-white/10 text-white"
        }`}
      >
        1:1
      </button>
      <button
        onClick={() => onChange("aspect-video")}
        className={`px-4 py-2 rounded-full text-sm border ${
          aspect === "aspect-video"
            ? "bg-white text-black"
            : "bg-white/10 text-white"
        }`}
      >
        16:9
      </button>
    </div>
  );
}

export default ButtonSize;
