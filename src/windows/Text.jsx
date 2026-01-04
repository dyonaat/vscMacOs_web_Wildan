// JavaScript
import { useEffect, useRef } from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components";

const MIN_W = 320;
const MAX_W = 650;
const MIN_H = 200;
const MAX_H = () => Math.floor(window.innerHeight * 0.85);

const TextFile = ({ windowData, setWindowSize, windowKey }) => {
  const bodyRef = useRef(null);
  const title = windowData?.name ?? "Text";

  const autosize = () => {
    const el = bodyRef.current;
    if (!el) return;

    const headerH = 56;
    const padding = 16;

    // Hitung ukuran konten dengan lebih akurat
    const contentW = Math.max(el.scrollWidth, el.offsetWidth) + padding * 2;
    const contentH = Math.max(el.scrollHeight, el.offsetHeight) + padding * 2 + headerH;

    // Hitung ukuran maksimum berdasarkan viewport saat ini
    const maxW = Math.min(MAX_W, Math.floor(window.innerWidth * 0.9));
    const maxH = Math.min(MAX_H(), Math.floor(window.innerHeight * 0.85));

    const targetW = Math.min(maxW, Math.max(MIN_W, contentW));
    const targetH = Math.min(maxH, Math.max(MIN_H, contentH));

    setWindowSize?.(targetW, targetH);
  };

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;

    // Delay untuk memastikan DOM sudah ter-render
    const timeoutId = setTimeout(() => {
      autosize();
    }, 100);

    // Resize saat gambar di dalam teks selesai dimuat
    const imgs = Array.from(el.querySelectorAll("img"));
    const cleanups = imgs.map((img) => {
      const fn = () => {
        setTimeout(() => autosize(), 50);
      };
      img.addEventListener("load", fn);
      img.addEventListener("error", fn);
      return () => {
        img.removeEventListener("load", fn);
        img.removeEventListener("error", fn);
      };
    });

    // Observe perubahan layout dengan debounce
    let resizeTimeout;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => autosize(), 100);
    });
    ro.observe(el);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(resizeTimeout);
      cleanups.forEach((off) => off());
      ro.disconnect();
    };
  }, [
    windowData?.content,
    windowData?.description,
    windowData?.image,
    windowData?.subtitle,
    windowData?.name,
  ]);

  return (
    <>
      <div id="window-header">
        {/* Perbaikan: gunakan nilai variabel windowKey, bukan string */}
        <WindowControls target={windowKey || "txtfile"} />
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium truncate">{title}</span>
        </div>
      </div>

      <div ref={bodyRef} className="p-4 h-full w-full overflow-auto">
        {windowData?.image && (
          <img
            src={windowData.image}
            alt={windowData?.subtitle ?? "Image"}
            className="max-w-full h-auto mb-3 rounded"
            draggable={false}
          />
        )}

        {windowData?.subtitle && (
          <h3 className="text-base font-semibold mb-2">{windowData.subtitle}</h3>
        )}

        {Array.isArray(windowData?.description) ? (
          windowData.description.map((line, i) => (
            <p key={i} className="mb-2 leading-relaxed text-sm text-gray-800">
              {line}
            </p>
          ))
        ) : windowData?.content ? (
          <p className="leading-relaxed text-sm text-gray-800">{windowData.content}</p>
        ) : null}
      </div>
    </>
  );
};

export default WindowWrapper(TextFile, "txtfile");
