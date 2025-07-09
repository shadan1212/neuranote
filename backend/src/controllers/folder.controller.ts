import { Request, Response } from "express";
import Folder from "../models/folder.model";
import Memory from "../models/memory.model";

// @desc    Get all folders for the logged-in user
// @route   GET /api/folders
// @access  Private
export const getFolders = async (req: Request, res: Response) => {
  try {
    const folders = await Folder.find({ user: req.user?._id });
    res.json(folders);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Create a new folder
// @route   POST /api/folders
// @access  Private
export const createFolder = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const folder = new Folder({
      name,
      user: req.user?._id,
    });

    const createdFolder = await folder.save();
    res.status(201).json(createdFolder);
  } catch (error) {
    res.status(400).json({ message: "Could not create folder" });
  }
};

// @desc    Update a folder's name
// @route   PUT /api/folders/:id
// @access  Private
export const updateFolder = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const folder = await Folder.findById(req.params.id);

    if (folder && folder.user.toString() === req.user?._id.toString()) {
      folder.name = name || folder.name;
      const updatedFolder = await folder.save();
      res.json(updatedFolder);
    } else {
      res
        .status(404)
        .json({ message: "Folder not found or user not authorized" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete a folder
// @route   DELETE /api/folders/:id
// @access  Private
export const deleteFolder = async (req: Request, res: Response) => {
  try {
    const folder = await Folder.findById(req.params.id);

    if (folder && folder.user.toString() === req.user?._id.toString()) {
      await Memory.updateMany(
        { folder: folder._id },
        { $unset: { folder: 1 } }
      );

      await folder.deleteOne();
      res.json({ message: "Folder removed" });
    } else {
      res
        .status(404)
        .json({ message: "Folder not found or user not authorized" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
