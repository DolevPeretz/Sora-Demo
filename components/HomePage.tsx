"use client";
import SideNavebar from "@/components/SideNavebar";
import TopNavbar from "../components/TopNavebar";
import SearchBar from "../components/SearchBar";
import ListCard from "@/components/ListCard";

function HomePage() {
  return (
    <>
      <TopNavbar />
      <div className="flex h-screen bg-black text-white">
        <SideNavebar />
        <main className="flex-1 overflow-y-auto">
          <ListCard />
        </main>
        <SearchBar />
      </div>
    </>
  );
}

export default HomePage;
