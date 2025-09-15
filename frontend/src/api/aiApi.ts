import api from "../utils/axios.config";
import type { Message } from "../store/aiStore";

export const queryAI = async (
  messages: Message[]
): Promise<{ answer: string; credits: { used: number; limit: number } }> => {
  const respone = await api.post("/ai/query", { messages });
  return respone.data;
};
