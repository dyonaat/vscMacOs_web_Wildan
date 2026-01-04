import { useEffect, useMemo, useState } from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components";
import useWindowStore from "#store/window.js";
import { gallery as GALLERY_CONST } from "#constants/index.js";

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const Gallery = ({ setWindowSize }) => {
  const { openWindow } = useWindowStore();
  const images = useMemo(() => shuffle(GALLERY_CONST).slice(0, 3), []);

  useEffect(() => {
    setWindowSize?.(860, 340);
  }, [setWindowSize]);

  const openImage = (img, idx) => {
    const key = `imagefile-gallery-${Date.now()}-${idx}`;
    const item = {
      id: `${Date.now()}-${idx}`,
      name: `Gallery Image ${idx + 1}`,
      imageURL: img.img || img,
    };
    openWindow(key, item);
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="photos" />
        <div className="flex-1 flex items-center px-2">
          <span className="text-sm font-medium">Old Project</span>
        </div>
      </div>

      <div className="bg-white h-full p-4">
        <div className="flex gap-4 h-full items-center">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => openImage(img, i)}
              className="flex-1 h-full overflow-hidden rounded-md bg-gray-100 flex items-center justify-center"
            >
              <img
                src={img.img}
                alt={`gallery-${i}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

const GalleryWindow = WindowWrapper(Gallery, "photos");
export default GalleryWindow;
