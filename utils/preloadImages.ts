export type ImageData = {
  url: string;
  width: number;
  height: number;
  content_type: string;
};

// export function preloadImages(imageList: ImageData[]): Promise<void> {
//   return new Promise((resolve) => {
//     let loaded = 0;
//     imageList.forEach((img) => {
//       const image = new Image();
//       image.src = img.url;
//       image.onload = image.onerror = () => {
//         loaded++;
//         if (loaded === imageList.length) resolve();
//       };
//     });
//   });
// }

// export const preloadImages = (urls: string[]): Promise<void> => {
//   return new Promise((resolve) => {
//     let loaded = 0;
//     urls.forEach((url) => {
//       const img = new Image();
//       img.src = url;
//       img.onload = img.onerror = () => {
//         loaded++;
//         if (loaded === urls.length) {
//           resolve();
//         }
//       };
//     });
//   });
// };

// export function preloadImagesAsync(urls: string[]): Promise<void[]> {
//   const promises = urls.map(
//     (src) =>
//       new Promise<void>((resolve, reject) => {
//         const img = new Image();
//         img.onload = () => resolve();
//         img.onerror = reject;
//         img.src = src;
//       })
//   );
//   return Promise.all(promises);
// }

export async function preloadImagesAsync(urls: string[]): Promise<string[]> {
  const preload = (url: string) =>
    new Promise<string | null>((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => resolve(null);
      img.src = url;
    });

  const results = await Promise.all(urls.map(preload));
  return results.filter((url): url is string => url !== null);
}
