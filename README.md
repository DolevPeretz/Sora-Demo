General Overview
The application displays images or videos retrieved from an external API based on a search term (prompt) and supports infinite scroll functionality.

Key Features
Uses React Query to manage API calls with caching and pagination support.

Preloads images in batches to enhance user experience.

Restores scroll position when navigating back from an individual image page.

Supports different image aspect ratios (square, vertical, horizontal).

Smooth transition between old and new results when the search term changes.

Automatically loads more images when the user scrolls to the bottom of the page.

Core Technologies
React (Client Components)

Next.js 14 (App Router)

React Query (useInfiniteQuery)

Tailwind CSS

Intersection Observer (useInView)

Session Storage for scroll position restoration

Architecture
ListCard – Main component that renders the image gallery.

useGenerateImage – Custom hook that handles API requests based on the prompt.

usePreloadImages – Hook that handles preloading of image batches.

useScrollToSavedImage – Hook that restores the user's previous scroll position.

Card and ImageGrid – Components for displaying images with adjustable aspect ratios.
