import express from "express";
import {
  createTrainingPlan,
  updateTrainingPLan,
  getTrainingPlan,
  deleteTrainingPlan,
} from "../controllers/trainingPlanController.js";
import { authenticateUser } from "../middleware/Authentication.js";

const router = express.Router();

router.use(authenticateUser);

router
  .route("/")
  .get(getTrainingPlan)
  .post(createTrainingPlan)
  .patch(updateTrainingPLan)
  .delete(deleteTrainingPlan);

export default router;
