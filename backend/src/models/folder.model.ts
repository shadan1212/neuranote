import mongoose, { Schema, Document } from "mongoose";

export interface IFolder extends Document {
  name: string;
  user: mongoose.Schema.Types.ObjectId;
}

const folderSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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

const Folder = mongoose.model<IFolder>("Folder", folderSchema);
export default Folder;
