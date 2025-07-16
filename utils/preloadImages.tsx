export type ImageData = {
  url: string;
  width: number;
  height: number;
  content_type: string;
};

export function preloadImages(imageList: ImageData[]): Promise<void> {
  return new Promise((resolve) => {
    let loaded = 0;
    imageList.forEach((img) => {
      const image = new Image();
      image.src = img.url;
      image.onload = image.onerror = () => {
        loaded++;
        if (loaded === imageList.length) resolve();
      };
    });
  });
}
