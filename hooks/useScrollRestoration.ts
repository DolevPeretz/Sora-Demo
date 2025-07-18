"use client";
import { useEffect } from "react";

export function useScrollToSavedImage(isReady: boolean) {
  useEffect(() => {
    if (!isReady) return;

    const savedIndex = sessionStorage.getItem("scrollIndex");
    const savedY = sessionStorage.getItem("scrollY");

    const scroll = () => {
      if (savedIndex) {
        const target = document.getElementById(`img-${savedIndex}`);
        if (target) {
          target.scrollIntoView({ behavior: "instant", block: "center" });
          sessionStorage.removeItem("scrollIndex");
          sessionStorage.removeItem("scrollY");
          return;
        }
      }

      if (savedY) {
        window.scrollTo({ top: parseInt(savedY), behavior: "smooth" });
        sessionStorage.removeItem("scrollY");
      }
    };

    const timeout = setTimeout(scroll, 100);
    return () => clearTimeout(timeout);
  }, [isReady]);
}
