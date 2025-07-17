"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function useScrollRestoration() {
  //   const pathname = usePathname();
  //   const searchParams = useSearchParams();
  //   useEffect(() => {
  //     const key = `scroll-pos:${pathname}?${searchParams.toString()}`;
  //     const saveScroll = () => {
  //       sessionStorage.setItem(key, window.scrollY.toString());
  //     };
  //     window.addEventListener("beforeunload", saveScroll);
  //     return () => {
  //       saveScroll();
  //       window.removeEventListener("beforeunload", saveScroll);
  //     };
  //   }, [pathname, searchParams]);
  //   useEffect(() => {
  //     const key = `scroll-pos:${pathname}?${searchParams.toString()}`;
  //     const savedY = sessionStorage.getItem(key);
  //     if (savedY) {
  //       window.scrollTo(0, parseInt(savedY, 10));
  //     }
  //   }, [pathname, searchParams]);
}
