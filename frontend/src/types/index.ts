export interface User {
  _id: string;
  name: string;
  email: string;
}

export type RegisterData = Omit<User, "_id"> & { password: string };
export type LoginData = Omit<User, "_id" | "name"> & { password: string };
