import TrainingPlan from "../model/TrainingPlan.js";
import CustomError from "../errors/error-index.js";
import { StatusCodes } from "http-status-codes";

export const createTrainingPlan = async (req, res) => {
  const { title, description, goal, level, type, daysPerWeek, sessions } =
    req.body;

  if (
    !title ||
    !description ||
    !goal ||
    !level ||
    !type ||
    !daysPerWeek ||
    !sessions
  ) {
    throw new CustomError.BadRequestError("All fields must be provided");
  }

  const hasOngoingPlan = await TrainingPlan.findOne({ user: req.user.userId });
  if (hasOngoingPlan) {
    throw new CustomError.BadRequestError(
      "You Have Ongoing Training Plan Already"
    );
  }

  await TrainingPlan.create({
    title,
    description,
    goal,
    level,
    type,
    daysPerWeek,
    sessions,
    user: req.user.userId,
  });
  res.status(StatusCodes.CREATED).json({ msg: "Training Plan Created" });
};

export const updateTrainingPLan = async (req, res) => {
  const { sessions } = req.body;
  if (!sessions) {
    throw new CustomError.BadRequestError("Session not provided");
  }
  const trainingPlan = await TrainingPlan.findOne({ user: req.user.userId });
  if (!trainingPlan) {
    throw new CustomError.NotFoundError("You Have No Training Plan");
  }
  trainingPlan.sessions = sessions;
  await trainingPlan.save();
  res.status(StatusCodes.OK).json({ msg: "Training Plan Updated" });
};

export const getTrainingPlan = async (req, res) => {
  const trainingPlan = await TrainingPlan.findOne({ user: req.user.userId });
  if (!trainingPlan) {
    throw new CustomError.NotFoundError("You Have No Training Plan");
  }
  res.status(StatusCodes.OK).json(trainingPlan);
};

export const deleteTrainingPlan = async (req, res) => {
  await TrainingPlan.findOneAndDelete({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ msg: "Training Plan Deleted" });
};
