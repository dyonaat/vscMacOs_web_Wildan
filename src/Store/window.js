// JavaScript
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants/index.js";

const useWindowStore = create(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

// JavaScript
// JavaScript
openWindow: (windowKey, data = null) =>
  set((state) => {
    if (!state.windows[windowKey]) {
      state.windows[windowKey] = { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null };
    }
    const win = state.windows[windowKey];
    win.isOpen = true;
    win.zIndex = state.nextZIndex;
    win.data = data ?? win.data;
    state.nextZIndex++;
  }),

//  Perubahan

    closeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      }),

    focusWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.zIndex = state.nextZIndex++;
      }),
  })),
);

export default useWindowStore;
