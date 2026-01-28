import express from "express";
import {
  createTask,
  getAllTasks,
  getMyTasks,
  getTaskById,
  updateTaskStatus,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = express.Router();

// Admin
router.post("/", authMiddleware, roleMiddleware("admin"), createTask);
router.get("/", authMiddleware, roleMiddleware("admin"), getAllTasks);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateTask);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteTask);

// User + Admin
router.get("/my", authMiddleware, getMyTasks);
router.get("/:id", authMiddleware, getTaskById);
router.patch("/:id/status", authMiddleware, updateTaskStatus);

export default router;
