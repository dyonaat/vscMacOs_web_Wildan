import useWindowStore from "#store/window.js";

const WindowControls = ({ target }) => {
  const closeWindow = useWindowStore((s) => s.closeWindow);

  return (
    <div id="window-controls">
      <button
        className="close"
        onClick={() => closeWindow(target)}
        aria-label="Close window"
      />
      <div className="minimize" />
      <div className="maximize" />
    </div>
  );
};

export default WindowControls;