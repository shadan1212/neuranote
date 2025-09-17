export interface User {
  _id: string;
  name: string;
  email: string;
}

export type MemoryType = "Videos" | "Posts" | "Blogs" | "Notes" | "Ideas";

export interface IMemory {
  _id: string;
  type: MemoryType | string;
  url?: string;
  title: string;
  description?: string;
  tags: string[];
  user: string[];
  createdAt: string;
  updatedAt: string;
}

// For User
export type RegisterData = Omit<User, "_id"> & { password: string };
export type LoginData = Omit<User, "_id" | "name"> & { password: string };

// For Memory
export type CreateMemoryData = Omit<
  IMemory,
  "_id" | "user" | "createdAt" | "updatedAt"
>;
export type UpadateMemoryData = Partial<CreateMemoryData>;
