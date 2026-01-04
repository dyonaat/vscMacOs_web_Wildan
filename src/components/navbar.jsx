import dayjs from "dayjs";
import { navLinks, navIcons } from "../constants/index.js";
import useWindowStore from "#store/window.js";
import { asset } from "#utils/asset";


const Navbar = () => {
  const { openWindow } = useWindowStore();

  return (
    <nav className="flex items-center justify-between px-3 h-8">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <img src={asset("images/logo.svg")} alt="logo" />
        <p className="font-bold">Alfath's Portfolio</p>

        <ul className="flex items-center gap-3">
          {navLinks.map(({ id, name, type }) => (
            <li
              key={id}
              onClick={() => openWindow(type)}
              className="cursor-pointer hover:underline"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <ul className="flex items-center gap-3">
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img
                src={img}
                className="icon-hover"
                alt={`icon-${id}`}
              />
            </li>
          ))}
        </ul>

        <time className="text-sm">
          {dayjs().format("ddd MM D h:mm A")}
        </time>
      </div>
    </nav>
  );
};

export default Navbar;
