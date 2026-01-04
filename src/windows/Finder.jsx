// JavaScript
import { Search } from "lucide-react";
import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { locations } from "#constants/index.js";
import useLocationStore from "#store/location.js";
import useWindowStore from "#store/window.js";
import clsx from "clsx";

const Finder = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();

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
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>

      <div className="bg-white flex h-full">
        {/* SIDEBAR */}
        <div className="sidebar">
          {renderList("Favorites", Object.values(locations))}
          {renderList("Work", locations.work.children)}
        </div>

        {/* CONTENT */}
        <ul className="content">
          {activeLocation?.children?.map((item) => (
            <li
              key={item.id}
              className={item.position}
              onClick={() => openItem(item)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow;
