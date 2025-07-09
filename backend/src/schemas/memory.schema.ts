import { z } from "zod";
import mongoose from "mongoose";

const isValidObjectId = (val: string) => mongoose.Types.ObjectId.isValid(val);

export const createMemorySchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    type: z.enum(["link", "note"]),
    content: z.string().min(1, "Content is required"),
    tags: z.array(z.string()).optional(),
    folder: z
      .string()
      .refine(isValidObjectId, { message: "Invalid folder ID" })
      .optional(),
  }),
});

export const updateMemorySchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").optional(),
    type: z.enum(["link", "note"]).optional(),
    content: z.string().min(1, "Content is required").optional(),
    tags: z.array(z.string()).optional(),
    folder: z
      .string()
      .refine(isValidObjectId, { message: "Invalid folder ID" })
      .optional()
      .nullable(),
  }),
});
