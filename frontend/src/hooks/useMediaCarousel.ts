import { useEffect, useState } from "react";

type MediaItem = {
  url: string;
  type: "image" | "video";
};

export function useMediaCarousel(media: MediaItem[]) {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % media.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  // auto-rotate images
  useEffect(() => {
    if (media.length <= 1) return;

    const current = media[index];
    if (current.type === "video") return;

    const timer = setTimeout(next, 5000);
    return () => clearTimeout(timer);
  }, [index, media]);

  return { index, next, prev };
}
