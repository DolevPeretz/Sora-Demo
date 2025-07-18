"use client";
import TopNavbar from "@/components/TopNavebar";
import SideNavebar from "@/components/SideNavebar";
import SearchBar from "@/components/SearchBar";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";

function NavBar() {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <SearchBar />
      </Suspense>
    </>
  );
}

export default NavBar;
