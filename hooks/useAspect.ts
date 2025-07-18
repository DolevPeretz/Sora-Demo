import { useEffect, useState } from "react";

export type AspectRatio = "aspect-square" | "aspect-video" | "aspect-[9/16]";

export function useAspect(defaultAspect: AspectRatio = "aspect-square") {
  const [aspect, setAspect] = useState<AspectRatio>(defaultAspect);

  useEffect(() => {
    const saved = sessionStorage.getItem("aspect");
    if (saved) {
      setAspect(saved as AspectRatio);
    }
  }, []);

  const updateAspect = (newAspect: AspectRatio) => {
    setAspect(newAspect);
    sessionStorage.setItem("aspect", newAspect);
  };

  return { aspect, setAspect: updateAspect };
}
