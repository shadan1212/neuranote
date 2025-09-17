import jwt from "jsonwebtoken";
import { Response } from "express";
import mongoose from "mongoose";

const generateToken = (res: Response, userId: mongoose.Types.ObjectId) => {
  // Ensure the environment variables are loaded
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET or JWT_EXPIRES_IN not defined in .env file");
  }

  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Set to true in production
    sameSite: "strict", // Or 'lax' depending on your needs
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;
