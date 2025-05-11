import express from "express";
import {
  register,
  login,
  logout,
  getCurrentUser,
} from "../controllers/authController.js";
import { authenticateUser } from "../middleware/Authentication.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", authenticateUser, logout);
router.get("/me", authenticateUser, getCurrentUser);

export default router;
