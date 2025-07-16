"use client";

import { Suspense } from "react";
import LoadingPage from "@/components/LoadingPage";
import InitialLoaderWrapper from "@/components/InitialLoaderWrapper";
import HomePage from "@/components/HomePage";

function page() {
  return (
    <>
      <HomePage />
      {/* <Suspense fallback={<LoadingPage />}>
        <InitialLoaderWrapper />
      </Suspense> */}
    </>
  );
}

export default page;
