import useWindowStore from "#store/window.js";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const WindowWrapper = (Component, windowKeyDefault) => {
  const Wrapped = (props) => {
    const windowKey = props.windowKey || windowKeyDefault;

    const { focusWindow, closeWindow, windows } = useWindowStore();
    const { isOpen, zIndex, data } = windows[windowKey] || {};

    const ref = useRef(null);

    const [size, setSize] = useState(() => {
      if (windowKey === "photos") return { width: 860, height: 420 };
      return { width: 600, height: 400 };
    });

    const setWindowSize = (w, h) => {
      const maxW = Math.floor(window.innerWidth * 0.9);
      const maxH = Math.floor(window.innerHeight * 0.85);

      const W = Math.max(320, Math.min(w, maxW));
      const H = Math.max(240, Math.min(h, maxH));

      setSize({ width: W, height: H });
    };

    // Animasi buka window
    useGSAP(() => {
      if (!ref.current || !isOpen) return;

      gsap.fromTo(
        ref.current,
        { scale: 0.85, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }
      );
    }, [isOpen]);

    // Drag window
    useGSAP(() => {
      if (!ref.current) return;

      const headerEl = ref.current.querySelector("#window-header");
      const handleOption = windowKey === "photos" ? ref.current : headerEl || ref.current;

      const [instance] = Draggable.create(ref.current, {
        handle: handleOption,
        onPress: () => focusWindow(windowKey),
      });

      return () => instance.kill();
    }, [!isOpen, windowKey]);

    // Show / hide and compute initial centered position with small offset
    useLayoutEffect(() => {
      if (!ref.current) return;

      // hide/show
      ref.current.style.display = isOpen ? "block" : "none";

      if (!isOpen) return;

      // compute centered position
      const centerLeft = Math.floor((window.innerWidth - size.width) / 2);
      const centerTop = Math.floor((window.innerHeight - size.height) / 2);

      // small deterministic-ish offset so windows don't stack exactly
      const seed = Array.from(windowKey).reduce((s, ch) => s + ch.charCodeAt(0), 0) + Date.now();
      const rnd = (n) => {
        // simple pseudo-random using seed
        const x = Math.sin(seed + n) * 10000;
        return Math.floor((x - Math.floor(x)) * 40) - 20; // range [-20,20]
      };

      const offsetX = rnd(1);
      const offsetY = rnd(2);

      const left = Math.max(8, centerLeft + offsetX);
      const top = Math.max(8, centerTop + offsetY);

      ref.current.style.left = `${left}px`;
      ref.current.style.top = `${top}px`;
    }, [isOpen, size.width, size.height, windowKey]);

    if (!isOpen) return null;

    const baseClass = `
      absolute
      bg-white rounded-xl shadow-xl
      flex flex-col
      overflow-y-auto
    `;

    const centeredStyle =
      windowKey === "photos"
        ? {
            left: `${Math.max(12, Math.floor((window.innerWidth - size.width) / 2))}px`,
            top: `${Math.max(12, Math.floor(window.innerHeight - size.height - 48))}px`,
          }
        : { left: undefined };

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex, width: size.width, height: size.height }}
        onMouseDown={() => focusWindow(windowKey)}
        className={baseClass}
      >
        <div className="flex-1 overflow-y-auto">
          <Component
            {...props}
            windowData={data}
            windowKey={windowKey}
            setWindowSize={setWindowSize}
            closeSelf={() => closeWindow(windowKey)}
          />
        </div>
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapped;
};

export default WindowWrapper;
