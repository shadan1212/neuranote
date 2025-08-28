import mongoose, { Schema, Document } from "mongoose";
import { string } from "zod";

export interface IMemory extends Document {
  type: "note" | "youtube" | "tweet" | "blog" | "resource";
  url?: string;
  title: string;
  description?: string;
  tags: string[];
  user: mongoose.Schema.Types.ObjectId;
}

const memorySchema: Schema = new Schema(
  {
    type: {
      type: String,
      enum: ["note", "youtube", "tweet", "blog", "resource"],
      required: true,
    },
    url: {
      type: String,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Memory = mongoose.model<IMemory>("Memory", memorySchema);
export default Memory;
