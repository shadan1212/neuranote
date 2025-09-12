import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  aiQueryCount: number;
  lastQueryResetDate: Date;
}

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Do not return password by default
    },
    aiQueryCount: {
      type: Number,
      default: 0,
    },
    lastQueryResetDate: {
      type: Date,
      default: () => new Date(), // Sets the initial value to now
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
