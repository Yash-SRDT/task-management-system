import express from "express";
import { signup, login, selectRole, getMe } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getAllUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.patch("/role", selectRole);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);

router.get("/", authMiddleware, getAllUsers);

export default router;
