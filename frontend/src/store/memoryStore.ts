import { create } from "zustand";
import type { CreateMemoryData, IMemory, UpadateMemoryData } from "../types";
import { devtools } from "zustand/middleware";
import {
  getMemories,
  createMemory,
  updateMemory,
  deleteMemory,
} from "../api/memoryApi";

interface MemoryState {
  memories: IMemory[];
  isLoading: boolean;
  error: string | null;
  activeFilter: string;
  isModalOpen: boolean;
  selectedMemory: IMemory | null;
  setSelectedMemory: (memory: IMemory | null) => void;
  openModal: () => void;
  closeModal: () => void;
  setFilter: (filter: string) => void;
  fetchMemories: () => Promise<void>;
  addMemory: (memoryData: CreateMemoryData) => Promise<void>;
  editMemory: (id: string, memoryData: UpadateMemoryData) => Promise<void>;
  removeMemory: (id: string) => Promise<void>;
}

export const useMemoryStore = create<MemoryState>()(
  devtools(
    (set) => ({
      // Inital state
      memories: [],
      isLoading: false,
      error: null,
      activeFilter: "All",
      isModalOpen: false,
      selectedMemory: null,

      // Actions
      setFilter: (filter) => set({ activeFilter: filter }),

      openModal: () => set({ isModalOpen: true }),

      closeModal: () => set({ isModalOpen: false }),

      setSelectedMemory: (memory) => set({ selectedMemory: memory }),

      fetchMemories: async () => {
        set({ isLoading: true, error: null });
        try {
          const memories = await getMemories();
          set({ memories, isLoading: false });
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message || "Failed to fetch memories";
          set({ error: errorMessage, isLoading: false });
        }
      },

      addMemory: async (memoryData) => {
        set({ isLoading: true, error: null });
        try {
          const newMemory = await createMemory(memoryData);
          set((state) => ({
            memories: [newMemory, ...state.memories],
            isLoading: false,
          }));
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message || "Failed to create memory";
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },

      editMemory: async (id, memoryData) => {
        set({ isLoading: true, error: null });
        try {
          const updatedMemory = await updateMemory(id, memoryData);
          set((state) => ({
            memories: state.memories.map((m) =>
              m._id === id ? updatedMemory : m
            ),
            selectedMemory:
              state.selectedMemory?._id === id
                ? updatedMemory
                : state.selectedMemory,

            isLoading: false,
          }));
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message || "Failed to update memory";
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },

      removeMemory: async (id) => {
        set({ isLoading: true, error: null });
        try {
          await deleteMemory(id);
          set((state) => ({
            memories: state.memories.filter((m) => m._id !== id),
            isLoading: false,
          }));
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message || "Failed to delete memory";
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },
    }),
    {
      name: "memory-storage",
    }
  )
);
