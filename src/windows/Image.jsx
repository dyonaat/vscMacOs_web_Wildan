// JavaScript
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components";

const resolveImageSrc = (windowData) => {
  if (!windowData) return "";
  if (typeof windowData.imageURL === "string") return windowData.imageURL.trim();
  if (typeof windowData.href === "string") return windowData.href.trim();
  if (typeof windowData.src === "string") return windowData.src.trim();
  return "";
};

const ImageFile = ({ windowData, setWindowSize, windowKey }) => {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [zoom, setZoom] = useState(1);
  const [fit, setFit] = useState(true);

  const objectUrlRef = useRef(null);
  const imgRef = useRef(null);

  const title = windowData?.name ?? "Image";
  const alt = windowData?.alt ?? title;

  const src = useMemo(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    if (windowData?.file instanceof File || windowData?.file instanceof Blob) {
      const url = URL.createObjectURL(windowData.file);
      objectUrlRef.current = url;
      return url;
    }

    return resolveImageSrc(windowData);
  }, [windowData]);

  useEffect(() => {
    setStatus(src ? "loading" : "idle");
    setError("");
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, [src]);

  const onImgLoad = () => {
    setStatus("loaded");
    const img = imgRef.current;
    if (!img) return;

    // Animasi fade-in untuk gambar
    gsap.fromTo(img, 
      { opacity: 0, scale: 0.95 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.3, 
        ease: "power2.out" 
      }
    );

    // Kurangi delay untuk performa yang lebih baik
    setTimeout(() => {
      // Ambil ukuran asli gambar
      const naturalW = img.naturalWidth || 640;
      const naturalH = img.naturalHeight || 480;

      // Tambahkan ruang untuk header dan padding konten
      const headerH = 56; // tinggi header window
      const padding = 16; // padding konten
      const controlsH = 40; // tinggi area kontrol zoom

      // Hitung ukuran maksimum berdasarkan viewport (diperkecil)
      const maxW = Math.floor(window.innerWidth * 0.7);
      const maxH = Math.floor(window.innerHeight * 0.7);

      // Hitung ukuran target dengan mempertimbangkan batas maksimum
      let targetW = naturalW + padding * 2;
      let targetH = naturalH + headerH + controlsH + padding * 2;

      // Jika gambar terlalu besar, scale down sambil mempertahankan aspect ratio
      if (targetW > maxW || targetH > maxH) {
        const scaleW = maxW / targetW;
        const scaleH = maxH / targetH;
        const scale = Math.min(scaleW, scaleH);
        
        targetW = Math.floor(targetW * scale);
        targetH = Math.floor(targetH * scale);
      }

      // Pastikan ukuran minimum
      const minW = 320;
      const minH = 240;
      targetW = Math.max(minW, targetW);
      targetH = Math.max(minH, targetH);

      // Minta wrapper mengubah ukuran window
      setWindowSize?.(targetW, targetH);
    }, 16); // Kurangi delay ke 16ms (1 frame pada 60fps) untuk performa lebih baik
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target={windowKey || "imagefile"} />
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium truncate">{title}</span>
        </div>

        <div className="ml-auto flex items-center gap-2 pr-2">          <button
            className="btn btn-xs"
            onClick={() => {
              const img = imgRef.current;
              if (img) {
                gsap.to(img, {
                  scale: 1,
                  duration: 0.3,
                  ease: "power2.out"
                });
              }
              setFit(true);
              setZoom(1);
            }}
            title="Fit to window (Ctrl/Cmd+0)"
          >
            Fit
          </button>
          <button
            className="btn btn-xs"
            onClick={() => {
              const newZoom = Math.max(0.1, +(zoom - 0.1).toFixed(2));
              const img = imgRef.current;
              if (img && !fit) {
                gsap.to(img, {
                  scale: newZoom,
                  duration: 0.2,
                  ease: "power2.out"
                });
              }
              setFit(false);
              setZoom(newZoom);
            }}
            title="Zoom out (Ctrl/Cmd+-)"
          >
            -
          </button>
          <span className="text-xs w-10 text-center">{Math.round(zoom * 100)}%</span>
          <button
            className="btn btn-xs"
            onClick={() => {
              const newZoom = Math.min(5, +(zoom + 0.1).toFixed(2));
              const img = imgRef.current;
              if (img && !fit) {
                gsap.to(img, {
                  scale: newZoom,
                  duration: 0.2,
                  ease: "power2.out"
                });
              }
              setFit(false);
              setZoom(newZoom);
            }}
            title="Zoom in (Ctrl/Cmd+=)"
          >
            +
          </button>
        </div>
      </div>

      <div className="bg-white h-full w-full overflow-auto flex items-center justify-center">
        {!src && <div className="text-gray-500 text-sm">Tidak ada gambar untuk ditampilkan</div>}        {status === "loading" && (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-sm text-gray-500">Memuat gambar...</span>
          </div>
        )}

        {!!src && (
          <div className={`max-w-full max-h-full ${fit ? "w-full h-full flex items-center justify-center" : "p-4"}`}>
            <img
              ref={imgRef}
              src={src}
              alt={alt}
              draggable={false}
              onLoad={onImgLoad}
              onError={() => {
                setStatus("error");
                setError("Gagal memuat gambar. Mungkin dipindahkan atau diblokir CORS.");
              }}
              className={fit ? "max-w-full max-h-full object-contain select-none" : "select-none"}
              style={{
                ...(fit ? undefined : { transform: `scale(${zoom})`, transformOrigin: "center" }),
                opacity: status === "loaded" ? 1 : 0,
                transition: status === "loading" ? "none" : "opacity 0.3s ease-out"
              }}
            />
          </div>
        )}

        {status === "error" && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-red-600 text-xs bg-white/90 px-2 py-1 rounded shadow">
            {error}
          </div>
        )}
      </div>
    </>
  );
};

export default WindowWrapper(ImageFile, "imagefile");
