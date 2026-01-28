import express from "express";
import { signup, login, selectRole } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.patch("/role", selectRole);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);

export default router;
