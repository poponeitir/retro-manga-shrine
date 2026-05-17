import { useRef, useState } from "react";
import {
  useCustomBg,
  useCustomGallery,
  fileToDataUrl,
} from "@/lib/media-store";
import { ImageCropper } from "@/components/ImageCropper";

type Pending =
  | { kind: "bg"; src: string }
  | { kind: "gallery"; queue: string[] }
  | null;

export function MediaUploader() {
  const [bg, setBg] = useCustomBg();
  const { images, add, remove, clear } = useCustomGallery();
  const bgRef = useRef<HTMLInputElement>(null);
  const galRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<Pending>(null);

  const onBg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    setPending({ kind: "bg", src: await fileToDataUrl(f) });
  };

  const onGallery = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;
    const urls = await Promise.all(files.map(fileToDataUrl));
    setPending({ kind: "gallery", queue: urls });
  };

  const handleConfirm = (cropped: string) => {
    if (!pending) return;
    if (pending.kind === "bg") {
      setBg(cropped);
      setPending(null);
      return;
    }
    // gallery queue: save current crop, advance
    add([cropped]);
    const rest = pending.queue.slice(1);
    setPending(rest.length ? { kind: "gallery", queue: rest } : null);
  };

  const handleCancel = () => {
    if (pending?.kind === "gallery") {
      const rest = pending.queue.slice(1);
      setPending(rest.length ? { kind: "gallery", queue: rest } : null);
    } else {
      setPending(null);
    }
  };

  const cropperSrc =
    pending?.kind === "bg"
      ? pending.src
      : pending?.kind === "gallery"
      ? pending.queue[0]
      : null;
  const cropperAspect = pending?.kind === "bg" ? 16 / 9 : 1;

  return (
    <div className="space-y-2 retro-mono text-[12px]">
      <div className="bevel-in p-2 bg-[#fbfbf0]">
        <div className="pixel text-[#660000] mb-1">[1] WALLPAPER.BMP</div>
        <input
          ref={bgRef}
          type="file"
          accept="image/*"
          onChange={onBg}
          className="hidden"
        />
        <div className="flex gap-1 items-center">
          <button
            onClick={() => bgRef.current?.click()}
            className="bevel-out px-2 py-[1px] text-[11px] font-bold active:bevel-in bg-[#c0c0c0]"
          >
            ▶ browse...
          </button>
          {bg && (
            <button
              onClick={() => setBg(null)}
              className="bevel-out px-2 py-[1px] text-[11px] active:bevel-in bg-[#c0c0c0]"
            >
              ✕ reset
            </button>
          )}
        </div>
        {bg && (
          <div className="bevel-in mt-1 p-[2px] inline-block bg-white">
            <img
              src={bg}
              alt="bg preview"
              className="block w-full max-w-[140px] h-16 object-cover"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
        )}
        <div className="pixel text-[10px] text-[#444] mt-1">
          sube tu collage, recorta 16:9 y se aplica al fondo.
        </div>
      </div>

      <div className="bevel-in p-2 bg-[#fbfbf0]">
        <div className="pixel text-[#660000] mb-1">[2] GALLERY/*.GIF</div>
        <input
          ref={galRef}
          type="file"
          accept="image/*"
          multiple
          onChange={onGallery}
          className="hidden"
        />
        <div className="flex gap-1 flex-wrap items-center">
          <button
            onClick={() => galRef.current?.click()}
            className="bevel-out px-2 py-[1px] text-[11px] font-bold active:bevel-in bg-[#c0c0c0]"
          >
            + add panel(s)
          </button>
          {images.length > 0 && (
            <button
              onClick={clear}
              className="bevel-out px-2 py-[1px] text-[11px] active:bevel-in bg-[#c0c0c0]"
            >
              ✕ clear all
            </button>
          )}
          <span className="pixel text-[10px] text-[#444]">
            {images.length} custom
          </span>
        </div>
        {images.length > 0 && (
          <div className="grid grid-cols-4 gap-1 mt-2">
            {images.map((src, i) => (
              <div key={i} className="relative bevel-in p-[2px] bg-white">
                <img
                  src={src}
                  alt={`thumb ${i}`}
                  className="block w-full h-12 object-cover"
                  style={{ imageRendering: "pixelated" }}
                />
                <button
                  onClick={() => remove(i)}
                  className="absolute top-0 right-0 bg-[#cc0000] text-white text-[9px] leading-none px-[3px] py-[1px] font-bold"
                  title="delete"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="pixel text-[10px] text-[#444] mt-1">
          recorta cuadrado 1:1 · aparecen primero en la galería
        </div>
      </div>

      <div className="pixel text-[9px] text-[#444]">
        ✦ guardado en localStorage del navegador. no se sube a internet.
      </div>

      {cropperSrc && (
        <ImageCropper
          key={cropperSrc}
          src={cropperSrc}
          aspect={cropperAspect}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
