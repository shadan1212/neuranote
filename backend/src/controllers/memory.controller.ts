import { Request, Response } from "express";
import Memory from "../models/memory.model";

// @desc    Get memories with filtering
// @route   GET /api/memories
// @access  Private
export const getMemories = async (req: Request, res: Response) => {
  try {
    const query: any = { user: req.user?._id };

    const memories = await Memory.find(query).sort({ createdAt: -1 });
    res.json(memories);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Create a new memory
// @route   POST /api/memories
// @access  Private
export const createMemory = async (req: Request, res: Response) => {
  const { type, url, title, description, tags } = req.body;
  try {
    const memory = new Memory({
      type,
      url,
      title,
      description,
      tags: tags || [],
      user: req.user?._id,
    });

    const createdMemory = await memory.save();
    res.status(201).json(createdMemory);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Could not create memory" });
  }
};

// @desc    Update a memory
// @route   PUT /api/memories/:id
// @access  Private
export const updateMemory = async (req: Request, res: Response) => {
  try {
    const memory = await Memory.findById(req.params.id);

    if (memory && memory.user.toString() === req.user?._id.toString()) {
      memory.type = req.body.type || memory.type;
      memory.url = req.body.url || memory.url;
      memory.title = req.body.title || memory.title;
      memory.description = req.body.description || memory.description;
      memory.tags = req.body.tags !== undefined ? req.body.tags : memory.tags;

      const updatedMemory = await memory.save();
      res.json(updatedMemory);
    } else {
      res
        .status(404)
        .json({ message: "Memory not found or user not authorized" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete a memory
// @route   DELETE /api/memories/:id
// @access  Private
export const deleteMemory = async (req: Request, res: Response) => {
  try {
    const memory = await Memory.findById(req.params.id);

    if (memory && memory.user.toString() === req.user?._id.toString()) {
      await memory.deleteOne();
      res.json({ message: "Memory removed" });
    } else {
      res
        .status(404)
        .json({ message: "Memory not found or user not authorized" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
