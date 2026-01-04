// JavaScript
import { Search } from "lucide-react";
import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { locations } from "#constants/index.js";
import useLocationStore from "#store/location.js";
import useWindowStore from "#store/window.js";
import { useEffect } from "react";

import clsx from "clsx";

const Finder = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();

  useEffect(() => {
  if (!activeLocation) {
    setActiveLocation(locations.work);
  }
}, [activeLocation, setActiveLocation]);


  // ===============================
  // OPEN ITEM
  // ===============================
  // JavaScript
// JavaScript
// JavaScript
const openItem = (item) => {
  // Folder
  if (item.kind === "folder") {
    setActiveLocation(item);
    return;
  }

  // PDF → Resume
  if (item.fileType === "pdf") {
    openWindow("resume", item);
    return;
  }

  // TXT → multi-instance
  if (item.fileType === "txt") {
    openWindow(`txtfile-${item.id}`, item);
    return;
  }

  // IMAGE → multi-instance
  if (item.fileType === "image") {
    console.log("[Finder] Opening imagefile:", {
      name: item.name,
      imageURL: item.imageURL,
    });
    openWindow(`imagefile-${item.id}`, item);
    return;
  }

  // External link
  if (item.fileType === "url" && item.href) {
    window.open(item.href, "_blank");
    return;
  }
};
//  Perubahan 2022-01-25 15:00 WIB



  // ===============================
  // SIDEBAR LIST
  // ===============================
  const renderList = (title, items) => (
    <div>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              activeLocation?.id === item.id ? "active" : "not-active"
            )}
          >
            <img src={item.icon} className="w-4" alt={item.name} />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <div
        id="window-header"
        className="
          h-10 px-3
          flex items-center gap-2
          bg-gray-100 border-b
          cursor-move select-none
        "
      >
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>

      <div className="flex h-full">
        {/* SIDEBAR */}
        <div className="sidebar bg-[#f6f6f6] border-r border-black/5">

          {renderList("Favorites", Object.values(locations))}
          {renderList("Work", locations.work.children)}
        </div>

        {/* CONTENT */}
        <ul
  className="
    bg-white
    flex-1
    grid
    grid-cols-3
    md:grid-cols-4
    lg:grid-cols-5
    xl:grid-cols-6
    2xl:grid-cols-7
    p-4
    gap-x-2
    gap-y-8
    justify-items-center
    content-start
  "
>


          {activeLocation?.children?.map((item) => (
            <li
              key={item.id}
              className="flex flex-col items-center text-center cursor-pointer select-none"
              onClick={() => openItem(item)}
            >
              <img src={item.icon} alt={item.name} className="w-14 h-14 object-contain" />
<p className="text-xs mt-1 break-words max-w-[80px]">
  {item.name}
</p>

            </li>
          ))}
        </ul>
      </div>
    </>
  );
};


// INI DI UBAH YANG BAWAH 2022-01-25 15:00 WIB
const FinderWindow = WindowWrapper(Finder, "finder", {
  noScroll: true,
});

export default FinderWindow;
// JavaScript
