import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  aspect?: number; // width / height, default 1
  outputSize?: number; // px on the longest side, default 800
  onCancel: () => void;
  onConfirm: (dataUrl: string) => void;
};

export function ImageCropper({
  src,
  aspect = 1,
  outputSize = 800,
  onCancel,
  onConfirm,
}: Props) {
  const VIEW_W = 260;
  const VIEW_H = Math.round(VIEW_W / aspect);

  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ x: number; y: number; px: number; py: number } | null>(null);

  useEffect(() => {
    const i = new Image();
    i.crossOrigin = "anonymous";
    i.onload = () => setImg(i);
    i.src = src;
  }, [src]);

  // base scale so the image covers the viewport
  const baseScale = img
    ? Math.max(VIEW_W / img.naturalWidth, VIEW_H / img.naturalHeight)
    : 1;
  const scale = baseScale * zoom;
  const drawW = img ? img.naturalWidth * scale : 0;
  const drawH = img ? img.naturalHeight * scale : 0;

  const clamp = (x: number, y: number) => {
    const minX = VIEW_W - drawW;
    const minY = VIEW_H - drawH;
    return {
      x: Math.min(0, Math.max(minX, x)),
      y: Math.min(0, Math.max(minY, y)),
    };
  };

  useEffect(() => {
    setPos((p) => clamp(p.x, p.y));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom, img]);

  const onDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { x: e.clientX, y: e.clientY, px: pos.x, py: pos.y };
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    setPos(clamp(dragRef.current.px + dx, dragRef.current.py + dy));
  };
  const onUp = () => {
    dragRef.current = null;
  };

  const confirm = () => {
    if (!img) return;
    // viewport in image coords
    const sx = -pos.x / scale;
    const sy = -pos.y / scale;
    const sw = VIEW_W / scale;
    const sh = VIEW_H / scale;
    const outW = aspect >= 1 ? outputSize : Math.round(outputSize * aspect);
    const outH = aspect >= 1 ? Math.round(outputSize / aspect) : outputSize;
    const canvas = document.createElement("canvas");
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, outW, outH);
    onConfirm(canvas.toDataURL("image/jpeg", 0.9));
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60"
      onClick={onCancel}
    >
      <div
        className="bevel-out p-[2px] bg-[#c0c0c0] max-w-[92vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="titlebar">
          <span>▓ crop_tool.exe — drag &amp; zoom</span>
          <span className="flex gap-[2px]">
            <span className="titlebar-btn" onClick={onCancel}>×</span>
          </span>
        </div>
        <div className="bg-[#c0c0c0] p-2">
          <div
            className="bevel-in bg-black relative overflow-hidden mx-auto touch-none select-none"
            style={{ width: VIEW_W, height: VIEW_H, cursor: "grab" }}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
          >
            {img && (
              <img
                src={src}
                alt="crop"
                draggable={false}
                style={{
                  position: "absolute",
                  left: pos.x,
                  top: pos.y,
                  width: drawW,
                  height: drawH,
                  maxWidth: "none",
                  imageRendering: "auto",
                  pointerEvents: "none",
                }}
              />
            )}
            {/* crosshair guides */}
            <div className="pointer-events-none absolute inset-0 border border-[#0ff] mix-blend-difference" />
            <div className="pointer-events-none absolute top-1/2 left-0 right-0 h-px bg-[#0ff] opacity-40" />
            <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-px bg-[#0ff] opacity-40" />
          </div>

          <div className="mt-2 retro-mono text-[12px] flex items-center gap-2">
            <span>ZOOM</span>
            <input
              type="range"
              min={1}
              max={4}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="flex-1"
            />
            <span className="pixel text-[#444] w-10 text-right">
              {zoom.toFixed(2)}x
            </span>
          </div>

          <div className="pixel text-[10px] text-[#444] mt-1">
            arrastra para reposicionar · usa el slider para zoom
          </div>

          <div className="mt-2 flex justify-end gap-1">
            <button
              onClick={onCancel}
              className="bevel-out px-3 py-[2px] text-[12px] active:bevel-in bg-[#c0c0c0]"
            >
              cancel
            </button>
            <button
              onClick={confirm}
              className="bevel-out px-3 py-[2px] text-[12px] font-bold active:bevel-in bg-[#c0c0c0]"
            >
              ▶ save crop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
