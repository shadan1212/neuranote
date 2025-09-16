import { Request, Response, NextFunction, RequestHandler } from "express";
import User, { IUser } from "../models/user.model";
import { DAILY_LIMIT } from "../config/limit";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

const checkApiLimit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const now = new Date();
    const startOfTodayUTC = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        0,
        0,
        0,
        0
      )
    );

    // setting the queryCount and Date for a fresh day
    if (!user.lastQueryResetDate || user.lastQueryResetDate < startOfTodayUTC) {
      user.aiQueryCount = 0;
      user.lastQueryResetDate = new Date();
      await user.save();
      console.log("Query count has been reset for the new day.");
    }

    // Check if the user has exceeded their daily limit
    if (user.aiQueryCount >= DAILY_LIMIT) {
      res.status(403).json({
        message: `You have reached your daily limit of queries. Please try again tomorrow.`,
      });
    }
    next();
  } catch (error) {
    console.error("Error in API limit middleware:", error);
    res.status(500).json({ message: "Server error while checking API limit." });
  }
};

export { checkApiLimit };
