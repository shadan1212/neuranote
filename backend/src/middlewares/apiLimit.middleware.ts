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

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // setting the queryCount and Date for a fresh day
    if (user.lastQueryResetDate < today) {
      user.aiQueryCount = 0;
      user.lastQueryResetDate = today;
      await user.save();
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
