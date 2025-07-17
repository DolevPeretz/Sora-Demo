// import SideNavebar from "@/components/SideNavebar";
// import TopNavbar from "@/components/TopNavebar";
// import SearchBar from "@/components/SearchBar";
// import ListCard from "@/components/ListCard";
// import { fetchInitialImages } from "@/utils/fetchImages";

// export default async function HomePage({ searchParams }: { searchParams: { prompt?: string } }) {
//   const prompt = searchParams.prompt || "default";
//   const images = await fetchInitialImages(prompt);

//   return (
//     <>
//       <TopNavbar />
//       <div className="flex h-screen bg-black text-white">
//         <SideNavebar />
//         <main className="flex-1 overflow-y-auto">
//           <ListCard prompt={prompt} initialImages={images} />
//         </main>
//         <SearchBar />
//       </div>
//     </>
//   );
// }
