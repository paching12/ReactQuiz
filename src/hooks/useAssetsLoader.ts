import { useEffect, useState } from "react";

type AssetOptions = {
  images?: string[];
  fontFamily?: string;
  fontTimeout?: number;
};

const loadImages = (urls: string[]) =>
  Promise.all(
    urls.map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = url;
        })
    )
  );

export const useAssetsLoader = ({
  images = [],
  fontFamily = "Codystar",
  fontTimeout = 3000,
}: AssetOptions) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const waitForFont =
      document.fonts?.load(`1em ${fontFamily}`) ?? Promise.resolve();

    Promise.all([loadImages(images), waitForFont]).then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [images, fontFamily, fontTimeout]);

  return ready;
};
