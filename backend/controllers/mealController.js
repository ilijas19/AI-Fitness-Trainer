import MealPlan from "../model/MealPlan.js";
import CustomError from "../errors/error-index.js";
import { StatusCodes } from "http-status-codes";

export const createMealPlan = async (req, res) => {
  const { mealPlan } = req.body;
  if (!mealPlan) {
    throw new CustomError.BadRequestError("Meal Plan Must Be Provided");
  }

  const numberOfPlans = await MealPlan.countDocuments({
    user: req.user.userId,
  });

  if (numberOfPlans > 0) {
    throw new CustomError.BadRequestError(
      "Maximum Amount Of Meal Plans Reached"
    );
  }

  await MealPlan.create({ ...mealPlan });
  res.status(StatusCodes.OK).json({ msg: "Meal Plan Created" });
};

export const updateMealPlan = async (req, res) => {
  const { id: existingMealPlanId } = req.params;
  if (!existingMealPlanId) {
    throw new CustomError.BadRequestError("Existing plan id must be provided");
  }
  const { newMealPlan } = req.body;
  if (!newMealPlan) {
    throw new CustomError.BadRequestError("New Meal Plan Must Be Provided");
  }
  const mealPlan = await MealPlan.findOne({ _id: existingMealPlanId });
  if (!mealPlan) {
    throw new CustomError.NotFoundError("Meal Plan Not Found");
  }
  mealPlan.breakfast = newMealPlan.breakfast;
  mealPlan.lunch = newMealPlan.lunch;
  mealPlan.snack = newMealPlan.snack;
  mealPlan.dinner = newMealPlan.dinner;
  mealPlan.totalCalories = newMealPlan.totalCalories;
  mealPlan.totalMacros = newMealPlan.totalMacros;

  await mealPlan.save();
  res.status(StatusCodes.OK).json({ msg: "Meals Updated" });
};

export const getMyMealPlans = async (req, res) => {
  const { page = 1 } = req.query;
  const limit = 1;
  const skip = (page - 1) * limit;

  const mealPlans = await MealPlan.find({ user: req.user.userId })
    .skip(skip)
    .limit(limit);

  const totalPlans = await MealPlan.countDocuments({ user: req.user.userId });

  res.status(StatusCodes.OK).json({
    page: +page,
    hasNextPage: page < totalPlans,
    mealPlans,
  });
};

export const deleteMealPlan = async (req, res) => {
  const { id: mealId } = req.params;
  if (!mealId) {
    throw new CustomError.BadRequestError("Meal id needs to be provided");
  }
  const meal = await MealPlan.findOne({ _id: mealId });
  if (!meal) {
    throw new CustomError.NotFoundError("Meal not found");
  }
  await meal.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Plan Deleted" });
};
