import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import folderRoutes from "./routes/folder.routes";
import memoryRoutes from "./routes/memory.routes";
import dashboardRoutes from "./routes/dashboard.routes";

// connect to database
connectDB();

const app: Application = express();

// Middlewares
app.use(
  cors({
    origin: "",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// test route
// app.use("/", (req: Request, res: Response) => {
//   res.send("API is running...");
// });

// Use routes
app.use("/api/auth", authRoutes);
app.use("api/folder", folderRoutes);
app.use("/api/memory", memoryRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
