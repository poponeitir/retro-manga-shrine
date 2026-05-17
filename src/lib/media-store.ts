import { useEffect, useState } from "react";

const BG_KEY = "shrine:bg";
const GALLERY_KEY = "shrine:gallery";
const EVT = "shrine:media-change";

function read(key: string): string | string[] | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : null;
  } catch {
    return null;
  }
}

function write(key: string, val: unknown) {
  localStorage.setItem(key, JSON.stringify(val));
  window.dispatchEvent(new Event(EVT));
}

export function useCustomBg(): [string | null, (v: string | null) => void] {
  const [bg, setBg] = useState<string | null>(null);
  useEffect(() => {
    const sync = () => setBg((read(BG_KEY) as string | null) ?? null);
    sync();
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return [
    bg,
    (v) => {
      if (v == null) localStorage.removeItem(BG_KEY);
      else localStorage.setItem(BG_KEY, JSON.stringify(v));
      window.dispatchEvent(new Event(EVT));
    },
  ];
}

export function useCustomGallery(): {
  images: string[];
  add: (urls: string[]) => void;
  remove: (idx: number) => void;
  clear: () => void;
} {
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    const sync = () => setImages((read(GALLERY_KEY) as string[]) ?? []);
    sync();
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return {
    images,
    add: (urls) => {
      const current = (read(GALLERY_KEY) as string[]) ?? [];
      write(GALLERY_KEY, [...urls, ...current]);
    },
    remove: (idx) => {
      const current = (read(GALLERY_KEY) as string[]) ?? [];
      write(
        GALLERY_KEY,
        current.filter((_, i) => i !== idx),
      );
    },
    clear: () => {
      localStorage.removeItem(GALLERY_KEY);
      window.dispatchEvent(new Event(EVT));
    },
  };
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
