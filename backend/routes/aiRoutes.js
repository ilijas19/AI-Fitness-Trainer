import express from "express";
import {
  generateMealPlan,
  generateWorkoutPlan,
} from "../controllers/geminiController.js";
import { authenticateUser } from "../middleware/Authentication.js";

const router = express.Router();

router.use(authenticateUser);

router.post("/generate-plan", generateWorkoutPlan);
router.post("/generate-mealPlan", generateMealPlan);

export default router;
