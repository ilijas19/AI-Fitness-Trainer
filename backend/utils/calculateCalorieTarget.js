import CustomError from "../errors/error-index.js";

const calculateCalorieTarget = ({
  height, // in cm
  weight, // in kg
  age, // in years
  gender, // 'male' or 'female'
  activityLevel, // 'sedentary', 'light', 'moderate', 'active', 'veryActive'
  workoutsPerWeek, // number (optional)
  goal, // 'lose', 'maintain', 'gain'
}) => {
  if (!height || !weight || !age || !gender || !activityLevel || !goal) {
    throw new CustomError.BadRequestError("Missing required parameters");
  }

  const bmr =
    gender.toLowerCase() === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  const activityMultiplier =
    {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryactive: 1.9,
    }[activityLevel.toLowerCase()] || 1.2;

  let tdee = bmr * activityMultiplier;
  if (workoutsPerWeek) {
    tdee += (workoutsPerWeek * 350) / 7;
  }

  switch (goal.toLowerCase()) {
    case "lose":
      return Math.round(tdee - 500); // 500 cal deficit
    case "gain":
      return Math.round(tdee + 500); // 500 cal surplus
    default:
      return Math.round(tdee); // maintain
  }
};

export default calculateCalorieTarget;
