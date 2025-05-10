import express from "express";
import {
  register,
  login,
  logout,
  getCurrentUser,
} from "../controllers/authController.js";
import { authenticateUser } from "../middleware/Authentication.js";

const router = express.Router();

router.use(authenticateUser);

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", logout);
router.get("/me", getCurrentUser);
