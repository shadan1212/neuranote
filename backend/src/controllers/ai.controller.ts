import { Request, Response } from "express";
import Memory from "../models/memory.model";
import { type Content, GoogleGenAI } from "@google/genai";
import User from "../models/user.model";
import { DAILY_LIMIT } from "../config/limit";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Initialize Gemini client
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// @desc    Query user's memories with Gemini
// @route   POST /api/ai/query
// @access  Private
export const queryAI = async (req: Request, res: Response) => {
  const { messages } = req.body;

  if (!messages) {
    res.status(400).json({ message: "Messages are required" });
    return;
  }

  try {
    // Fetch User's data(Context)
    const memories = await Memory.find({ user: req.user?._id });

    if (memories.length === 0) {
      res.json({
        answer:
          "You don't have any memories saved yet. Add some notes or links to start searching.",
      });
      return;
    }

    // format data into clean context
    const context = memories
      .map((mem, index) => {
        let memoryDetails = `Memory ${index + 1}: This is a ${
          mem.type
        } titled "${mem.title}".`;
        if (mem.tags.length > 0) {
          memoryDetails += ` It is tagged with: ${mem.tags.join(", ")}.`;
        }
        memoryDetails += ` The content is: "${mem.description}".`;
        return memoryDetails;
      })
      .join("\n\n");

    const history: Content[] = [];

    history.push({
      role: "user",
      parts: [
        {
          text: `You are a helpful assistant for a "Second Brain" application. Your task is to answer the user's question based ONLY on the context of their memories, which will be provided first. If the answer cannot be found in the context, you MUST state: "I could not find an answer in your memories for this question." Do not use any external knowledge.Always respond in clean plain text without Markdown, asterisks, or formatting symbols. 
              Do not bold or italicize text.`,
        },
      ],
    });

    history.push({
      role: "user",
      parts: [
        {
          text: `Here is the complete context of all my memories:\n\n${context}`,
        },
      ],
    });

    history.push({
      role: "model",
      parts: [
        {
          text: "Great, I have read all your memories. How can I help you explore them?",
        },
      ],
    });

    for (let i = 0; i < messages.length - 1; i++) {
      const msg = messages[i];
      history.push({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      });
    }

    const chatSession = await ai.chats.create({
      model: "gemini-2.5-flash",
      history: history,
    });

    const latestMessage = messages[messages.length - 1].content;
    const response = await chatSession.sendMessage({
      message: latestMessage,
    });

    const answer = response.text;

    const updatedUser = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $inc: { aiQueryCount: 1 },
      },
      { new: true }
    );

    res.json({
      answer,
      credits: {
        used: updatedUser?.aiQueryCount,
        limit: DAILY_LIMIT,
      },
    });
  } catch (error) {
    console.error("Error processing AI query:", error);
    res
      .status(500)
      .json({ message: "Failed to process AI query with Gemini." });
  }
};
