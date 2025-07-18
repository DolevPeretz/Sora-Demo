✨ Main Features
🔁 Infinite Scroll – Automatically loads more images as the user scrolls down.

🔍 Search by Prompt – Updates the displayed images based on the entered prompt.

📐 Dynamic Aspect Ratio Support – Supports square, portrait, and landscape formats.

⚡ Batch Preloading – All images from the same request are loaded together with no delay between them.

💾 Scroll Position Restoration – Returns the user to the exact image they viewed after navigating back from the detail page.

📦 Caching with React Query – Prevents redundant API calls and improves performance.

🧱 Core Technologies
Next.js 14 (App Router)

React (Client Components)

TypeScript

React Query (useInfiniteQuery)

Tailwind CSS

Intersection Observer (useInView)

Session Storage – Used for preserving scroll position

🧠 Architecture
ListCard
The main component responsible for:

Fetching images from the API

Handling infinite scroll

Updating results when the prompt changes

Managing aspect ratio via context

useGenerateImage
A custom hook using useInfiniteQuery to:

Fetch images from the API

Handle pagination

Automatically refresh data when the prompt changes

usePreloadImages
Preloads image batches in the background

Ensures smooth and complete rendering of each batch

useScrollToSavedImage
Restores the user’s last scroll position using sessionStorage

ImageGrid & Card
UI components for displaying images/videos according to the selected aspect ratio

Each image can be opened in a full-screen detail view
