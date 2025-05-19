import Workout from "../model/Workout.js";
import CustomError from "../errors/error-index.js";
import { StatusCodes } from "http-status-codes";

export const createWorkout = async (req, res) => {
  const { exercises, date } = req.body;

  if (!exercises) {
    throw new CustomError.BadRequestError("Exercises Must Be Provided");
  }
  if (!date) {
    throw new CustomError.BadRequestError("Date Must Be Provided");
  }

  const existingWorkoutOnDate = await Workout.findOne({
    date,
    user: req.user.userId,
  });

  if (existingWorkoutOnDate) {
    throw new CustomError.BadRequestError(
      "You Already Created Workout On This Date"
    );
  }

  const workout = await Workout.create({
    exercises,
    date,
    user: req.user.userId,
  });

  res.status(StatusCodes.CREATED).json({ msg: "Workout Created" });
};

export const getWorkoutByDate = async (req, res) => {
  const { date } = req.params;
  if (!date) {
    throw new CustomError.BadRequestError("Date Must Be Provided");
  }
  const workout = await Workout.findOne({ date, user: req.user.userId });
  if (!workout) {
    throw new CustomError.NotFoundError(
      "You have no workout on this date yet !"
    );
  }
  res.status(StatusCodes.OK).json(workout);
};

export const deleteWorkout = async (req, res) => {
  const { id: workoutId } = req.params;
  if (!workoutId) {
    throw new CustomError.BadRequestError("Workout Id needs to be provided");
  }
  const workout = await Workout.findOne({
    _id: workoutId,
    user: req.user.userId,
  });
  if (!workout) {
    throw new CustomError.BadRequestError("Workout Not Found");
  }
  await workout.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Workout Deleted" });
};

export const getAllWorkouts = async (req, res) => {
  res.send("Get All Workouts");
};
