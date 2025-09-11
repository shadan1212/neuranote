import api from "../utils/axios.config";
import type { User, RegisterData, LoginData } from "../types";

export const registerUser = async (userData: RegisterData): Promise<User> => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (userData: LoginData): Promise<User> => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  await api.post("/auth/logout");
};
