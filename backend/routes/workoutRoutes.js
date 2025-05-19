import express from "express";
import {
  createWorkout,
  getWorkoutByDate,
  deleteWorkout,
  getAllWorkouts,
} from "../controllers/workoutController.js";
import { authenticateUser } from "../middleware/Authentication.js";

const router = express.Router();

router.use(authenticateUser);

router.get("/", getAllWorkouts);

router.post("/create", createWorkout);
router.get("/byDate/:date", getWorkoutByDate);
router.delete("/delete/:id", deleteWorkout);

export default router;
