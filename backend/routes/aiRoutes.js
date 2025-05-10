import express from "express";
import { generateWorkoutPlan } from "../controllers/geminiController.js";

const router = express.Router();

router.post("/generate-plan", generateWorkoutPlan);

export default router;
