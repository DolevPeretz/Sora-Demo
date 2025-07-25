import { fetchInitialImages } from "@/utils/fetchImages";
import ListCard from "@/components/ListCard";
import TopNavbar from "@/components/TopNavebar";
import SideNavebar from "@/components/SideNavebar";
export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ prompt?: string }>;
}) {
  const { prompt = "default" } = await searchParams;

  return (
    <>
      <TopNavbar />
      <div className="flex h-screen bg-black text-white">
        <SideNavebar />
        <main
          className="flex-1 overflow-y-auto"
          data-scroll-restoration-id="gallery"
        >
          <ListCard key={prompt} prompt={prompt} />
        </main>
      </div>
    </>
  );
}
