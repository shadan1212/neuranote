import type { CreateMemoryData, IMemory, UpadateMemoryData } from "../types";
import api from "../utils/axios.config";

export const getMemories = async (): Promise<IMemory[]> => {
  const response = await api.get("/memory/");
  return response.data;
};

export const createMemory = async (
  memoryData: CreateMemoryData
): Promise<IMemory> => {
  const response = await api.post("/memory/", memoryData);
  return response.data;
};

export const updateMemory = async (
  id: string,
  memoryData: UpadateMemoryData
): Promise<IMemory> => {
  const response = await api.put(`/memory/${id}`, memoryData);
  return response.data;
};

export const deleteMemory = async (
  id: string
): Promise<{ message: string }> => {
  const response = await api.delete(`/memory/${id}`);
  return response.data;
};
