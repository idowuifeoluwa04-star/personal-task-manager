import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import Task from "../models/Task";

// CREATE TASK

export const createTask = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { title, description, category, dueDate } = req.body;

    if (!title) {
      res.status(400).json({ message: "Title is required" });
      return;
    }

    const task = await Task.create({
      title,
      description,
      category,
      dueDate,
      owner: req.user!._id,
    });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({ message: "Unable to create task right now" });
  }
};

// GET ALL TASKS (for the logged-in user only — supports optional filtering)

export const getTasks = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { completed, category } = req.query;

    const filter: Record<string, unknown> = { owner: req.user!._id };

    // Optional filters — only applied if the query param is actually provided
    if (completed !== undefined) {
      filter.completed = completed === "true";
    }

    if (category !== undefined) {
      filter.category = category;
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Get tasks error:", error);
    res.status(500).json({ message: "Unable to fetch tasks right now" });
  }
};

// GET SINGLE TASK

export const getTaskById = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user!._id,
    });

    // not found covers both "doesn't exist" and "belongs to someone else" —
    // we don't want to confirm a task exists if it isn't theirs
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json({ task });
  } catch (error) {
    console.error("Get task error:", error);
    res.status(500).json({ message: "Unable to fetch task right now" });
  }
};

// UPDATE TASK

export const updateTask = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { title, description, category, completed, dueDate } = req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user!._id,
    });

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (category !== undefined) task.category = category;
    if (completed !== undefined) task.completed = completed;
    if (dueDate !== undefined) task.dueDate = dueDate;

    await task.save();

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({ message: "Unable to update task right now" });
  }
};

// DELETE TASK

export const deleteTask = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user!._id,
    });

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ message: "Unable to delete task right now" });
  }
};
