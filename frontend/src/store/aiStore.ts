import { create } from "zustand";
import { queryAI } from "../api/aiApi";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

interface aiState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  creditUsed: number | null;
  creditLimit: number | null;
  setMessages: () => void;
  askAI: (query: string) => Promise<void>;
}

export const useAIStore = create<aiState>((set, get) => ({
  // Initial states
  messages: [
    {
      role: "assistant",
      content:
        "Hello! I can help you search or answer questions related to your memmories. What would you like to know?",
    },
  ],
  isLoading: false,
  error: null,
  creditUsed: null,
  creditLimit: null,

  // Functions
  setMessages: () =>
    set({
      messages: [
        {
          role: "assistant",
          content:
            "Hello! I can help you search or answer questions related to your memmories. What would you like to know?",
        },
      ],
      error: null,
    }),

  askAI: async (query) => {
    const newMessage = { role: "user" as "user" | "assistant", content: query };
    const currentMessages = get().messages; // Get current messages from state
    const fullHistory = [...currentMessages, newMessage];

    set({
      messages: fullHistory, // Update UI with the user's new message
      isLoading: true,
      error: null,
    });

    try {
      const { answer, credits } = await queryAI(fullHistory);
      set((state) => ({
        messages: [...state.messages, { role: "assistant", content: answer }],
        isLoading: false,
        creditUsed: credits.used,
        creditLimit: credits.limit,
      }));
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      console.error("API Error:", error);

      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },
}));
