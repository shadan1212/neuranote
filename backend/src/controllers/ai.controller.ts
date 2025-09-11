import { Request, Response } from "express";
import Memory from "../models/memory.model";
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Initialize Gemini client
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// @desc    Query user's memories with Gemini
// @route   POST /api/ai/query
// @access  Private
export const queryAI = async (req: Request, res: Response) => {
  const { query } = req.body;

  if (!query) {
    res.status(400).json({ message: "Query is required" });
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

    // Final prompt
    const finalPrompt = `You are a helpful assistant for a "Second Brain" application. Your task is to answer the user's question based ONLY on the context provided below. The context contains all the relevant memories (notes and links) saved by the user. If the answer cannot be found in the context, you MUST state: "I could not find an answer in your memories for this question." Do not use any external knowledge.

Context:
"""
${context}
"""

User's Question: ${query}`;

    // Make API call to gemini
    const respone = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          parts: [{ text: finalPrompt }],
        },
      ],
    });

    const answer = respone.text;

    res.json({ answer });
  } catch (error) {
    console.error("Error processing AI query:", error);
    res
      .status(500)
      .json({ message: "Failed to process AI query with Gemini." });
  }
};
