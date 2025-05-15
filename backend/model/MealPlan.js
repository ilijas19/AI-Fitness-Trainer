import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: [String], required: true },
  calories: { type: Number, required: true },
  macros: {
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true },
  },
});

const mealPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    totalCalories: { type: Number, required: true },
    totalMacros: {
      totalProtein: { type: Number, required: true },
      totalCarbs: { type: Number, required: true },
      totalFats: { type: Number, required: true },
    },
    breakfast: { type: mealSchema, required: true },
    lunch: { type: mealSchema, required: true },
    snack: { type: mealSchema, required: true },
    dinner: { type: mealSchema, required: true },
  },
  {
    timestamps: true,
  }
);

const MealPlan = mongoose.model("MealPlan", mealPlanSchema);

export default MealPlan;
