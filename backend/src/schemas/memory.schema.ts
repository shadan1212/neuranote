import { z } from "zod";
import mongoose from "mongoose";

const isValidObjectId = (val: string) => mongoose.Types.ObjectId.isValid(val);

export const createMemorySchema = z.object({
  body: z.object({
    type: z.enum(["Videos", "Posts", "Blogs", "Notes", "Ideas"]),
    url: z.string().optional(),
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const updateMemorySchema = z.object({
  body: z.object({
    type: z
      .enum(["Videos", "Youtubes", "Tweets", "Blogs", "Notes", "Ideas"])
      .optional(),
    url: z.string().optional(),
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});
