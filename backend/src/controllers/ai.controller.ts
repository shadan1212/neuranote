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
        } titled "${mem.title}". the url is "${mem.url}"`;
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
          text: `You are an intelligent personal assistant for a "Second Brain" application. 
Your purpose is to help the user explore, connect, and reason with their own saved memories. 
You are their trusted thought partner. 
Your primary directives are: 
1. **Search and Synthesize:** When the user asks a question or describes something, find the most relevant memories from the context provided. Synthesize the information from one or more memories to provide a comprehensive answer. 
2. **Brainstorm and Connect:** If the user wants to explore a topic, connect ideas from different memories, even if they aren't obviously related. 
3. **Be Conversational:** Engage with the user in a natural, helpful, and collaborative tone. Rules you MUST follow: - Ground your answers in the provided context ONLY. Do not use external information. - When retrieving information, subtly cite the source memory's title. - If you genuinely cannot find any relevant information, state that you couldn't find anything related in their Second Brain.
In the answer, provide the stored url with the memory by stating: 'here is the link:'.
Always respond in clean plain text without Markdown, asterisks, or formatting symbols. Do not bold or italicize text.`,
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
