import { FaSearch } from "react-icons/fa";
import { libraryLinks, links } from "../utils/data";

function SideNavebar() {
  return (
    <aside className="h-screen w-64 text-white  flex-col px-2">
      <button className="mb-4 mt-1 inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-default data-[disabled=true]:opacity-50 relative shadow-inset-stroke text-white hover:bg-white/10 hover:shadow-none px-3 py-2 h-9 rounded-full gap-2 font-medium border border-white/20">
        <FaSearch className="text-white text-sm" />
        <span>Search</span>
        <kbd className="ml-auto text-gray-400 text-xs bg-[#ffffff20] px-1.5 py-0.5 rounded">
          Ctrl K
        </kbd>
      </button>

      <div className="flex flex-col gap-1">
        {links.map(({ id, href, text, icon }) => (
          <a
            key={id}
            href={href}
            className="flex items-center gap-2 text-md px-3 py-1  rounded-full hover:bg-gray-800 transition"
          >
            {icon}
            {text}
          </a>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <h4 className="text-sm uppercase text-gray-400 px-2 mt-10 mb-1">
          Library
        </h4>
        {libraryLinks.map(({ id, href, text, icon }) => (
          <a
            key={id}
            href={href}
            className="flex items-center gap-3 px-3 py-1 rounded-md hover:bg-gray-800 transition"
          >
            {icon}
            {text}
          </a>
        ))}
      </div>
    </aside>
  );
}

export default SideNavebar;
