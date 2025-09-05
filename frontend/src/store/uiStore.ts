import { create } from "zustand";

interface UIState {
  isSidebarOpen: boolean;
  isAiSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  setAiSidebarOpen: (isOpen: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  isAiSidebarOpen: false,
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  setAiSidebarOpen: (isOpen) => set({ isAiSidebarOpen: isOpen }),
}));
