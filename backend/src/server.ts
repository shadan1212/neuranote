import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import memoryRoutes from "./routes/memory.routes";
import scraperRoutes from "./routes/scraper.route";
import aiRoutes from "./routes/ai.routes";

// connect to database
connectDB();

const app: Application = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/memory", memoryRoutes);
app.use("/api/scraper", scraperRoutes);
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port on ${PORT}`));
