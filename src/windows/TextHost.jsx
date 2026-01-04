// JavaScript
import useWindowStore from "#store/window.js";
import Text from "./Text.jsx";

export default function TextHost() {
  const { windows } = useWindowStore();
  const keys = Object.keys(windows).filter((k) => k.startsWith("txtfile-"));
  return <>{keys.map((k) => <Text key={k} windowKey={k} />)}</>;
}
