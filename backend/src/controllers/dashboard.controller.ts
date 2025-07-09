import { Request, Response } from "express";
import Memory from "../models/memory.model";

// @desc    Get user stats for the dashboard
// @route   GET /api/dashboard/stats
// @access  Private
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    const memoryCount = await Memory.countDocuments({ user: userId });
    res.json(memoryCount);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
