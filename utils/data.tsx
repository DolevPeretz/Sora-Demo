import { nanoid } from "nanoid";
import {
  FaCompass,
  FaImage,
  FaVideo,
  FaTrophy,
  FaHeart,
  FaFolderOpen,
  FaStar,
  FaPlus,
  FaTrash,
  FaFolderPlus,
} from "react-icons/fa";

export const links = [
  {
    id: nanoid(),
    href: "#explore",
    text: "Explore",
    icon: <FaCompass />,
  },
  {
    id: nanoid(),
    href: "#images",
    text: "Images",
    icon: <FaImage />,
  },
  {
    id: nanoid(),
    href: "#videos",
    text: "Videos",
    icon: <FaVideo />,
  },
  {
    id: nanoid(),
    href: "#top",
    text: "Top",
    icon: <FaTrophy />,
  },
  {
    id: nanoid(),
    href: "#likes",
    text: "Likes",
    icon: <FaHeart />,
  },
];

export const libraryLinks = [
  {
    id: nanoid(),
    href: "#media",
    text: "My media",
    icon: <FaFolderOpen />,
  },
  {
    id: nanoid(),
    href: "#favorites",
    text: "Favorites",
    icon: <FaStar />,
  },
  {
    id: nanoid(),
    href: "#uploads",
    text: "Uploads",
    icon: <FaPlus />,
  },
  {
    id: nanoid(),
    href: "#trash",
    text: "Trash",
    icon: <FaTrash />,
  },
  {
    id: nanoid(),
    href: "#new-folder",
    text: "New folder",
    icon: <FaFolderPlus />,
  },
];
