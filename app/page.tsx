import { fetchInitialImages } from "@/utils/fetchImages";
import ListCard from "@/components/ListCard";
import TopNavbar from "@/components/TopNavebar";
import SideNavebar from "@/components/SideNavebar";
import SearchBar from "@/components/SearchBar";
import { headers } from "next/headers";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ prompt?: string }>;
}) {
  const { prompt = "default" } = await searchParams;
  const initialImages = await fetchInitialImages(prompt);

  return (
    <>
      <TopNavbar />
      <div className="flex h-screen bg-black text-white">
        <SideNavebar />
        <main
          className="flex-1 overflow-y-auto"
          data-scroll-restoration-id="gallery"
        >
          <ListCard
            key={prompt}
            prompt={prompt}
            initialImages={initialImages}
          />
        </main>
        <SearchBar />
      </div>
    </>
  );
}
