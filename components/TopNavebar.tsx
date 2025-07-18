import { FaFilter, FaBell } from "react-icons/fa";
import chatgpt from "../images/chatgpt.png";
import Profile from "../images/1.png";
import Image from "next/image";

function TopNavbar() {
  return (
    <header className="bg-black text-white px-4 py-3 flex justify-between items-center relative">
      <div className="flex items-center gap-2">
        <Image src={chatgpt} alt="Logo" className="w-7 h-7" />
      </div>

      <div className="flex items-center gap-4">
        <FaFilter className="filter-icon text-xl cursor-pointer" />
        <FaBell className="text-xl filter-icon  cursor-pointer" />
        <Image
          src={Profile}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover border border-white"
        />
      </div>
    </header>
  );
}
export default TopNavbar;
