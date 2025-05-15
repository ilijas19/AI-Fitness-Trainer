import express from "express";
import {
  createMealPlan,
  updateMealPlan,
  getMyMealPlans,
  deleteMealPlan,
} from "../controllers/mealController.js";
import { authenticateUser } from "../middleware/Authentication.js";

const router = express.Router();
router.use(authenticateUser);

router.route("/").post(createMealPlan).get(getMyMealPlans);

router.route("/:id").patch(updateMealPlan).delete(deleteMealPlan);

export default router;
