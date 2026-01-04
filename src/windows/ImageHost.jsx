// JavaScript
import useWindowStore from "#store/window.js";
import Image from "./Image.jsx";

export default function ImageHost() {
  const { windows } = useWindowStore();
  const keys = Object.keys(windows).filter(
    (k) => k.startsWith("imagefile-") && windows[k]?.isOpen
  );
  return <>{keys.map((k) => <Image key={k} windowKey={k} />)}</>;
}

// Perubahan 