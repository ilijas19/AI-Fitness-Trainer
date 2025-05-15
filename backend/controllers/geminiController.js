import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import CustomError from "../errors/error-index.js";
import calculateCalorieTarget from "../utils/calculateCalorieTarget.js";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateWorkoutPlan = async (req, res) => {
  try {
    const {
      goal,
      level,
      type,
      daysPerWeek,
      additionalInfo = "none",
      preferences = "none",
    } = req.body;
    if (!goal || !level || !type || !daysPerWeek) {
      throw new CustomError.BadRequestError("All fields must be provided");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
  Generate a personalized workout plan in STRICT JSON FORMAT matching this structure and 
  - ALWAYS USE NUMBER FOR REPS AND SETS NEVER USE AMRAP :
  {
    "title": "Workout Plan Title",
    "description": "Brief plan description",
    "goal": "${goal}",
    "level": "${level}",
    "type": "${type}",
    "daysPerWeek": ${daysPerWeek},
    "additionalInfo":${additionalInfo}
    "sessions": [
      {
        "day": "[monday-sunday]",
        "focusArea": "[upper|lower|full body/core/cardio/flexibility]",
        "exercises": [
          {
            "name": "Exercise Name",
            "description": "Clear instructions",
            "muscleGroup": "[valid muscle group]",
            "sets": number,
            "reps": number,
            "restBetweenSets": number
          }
        ]
      }
    ]
  }
  
  Guidelines:
  - Use exactly ${daysPerWeek} training days
  - Follow ${level} level parameters
  - ${
    type === "home" ? "Use bodyweight exercises" : "Use appropriate equipment"
  }
  - Rotate focus areas between sessions
  - Never use markdown formatting
  - ALWAYS USE NUMBER FOR REPS AND SETS
  
  Output ONLY the raw JSON without any additional text or explanations.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();

    text = text.replace(/```json|```/g, "").trim();

    const workoutPlan = JSON.parse(text);

    if (
      !workoutPlan.title ||
      !workoutPlan.sessions ||
      !Array.isArray(workoutPlan.sessions)
    ) {
      throw new Error("Invalid plan structure received from AI");
    }

    res.json({ plan: workoutPlan });
  } catch (error) {
    throw new CustomError.BadRequestError(
      `Training plan generation failed: ${error.message}`
    );
  }
};

export const generateMealPlan = async (req, res) => {
  const {
    age,
    weight,
    height,
    gender,
    activityLevel,
    goal,
    dietaryPreferences = "none",
    excludedIngredients = [],
  } = req.body;

  // Validate required inputs
  if (!age || !weight || !height || !gender || !activityLevel || !goal) {
    throw new CustomError.BadRequestError(
      "All required fields must be provided"
    );
  }

  try {
    // Calculate calorie target first
    const calorieTarget = calculateCalorieTarget({
      age,
      weight,
      height,
      gender,
      activityLevel,
      goal,
    });

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
Generate a daily meal plan in STRICT JSON FORMAT matching this EXACT structure:
{
  "totalCalories": ${calorieTarget},
  "totalMacros": {
    "totalProtein": number,
    "totalCarbs": number,
    "totalFats": number
  },
  "breakfast": {
    "name": "Meal Name",
    "ingredients": ["item1", "item2", "item3"],
    "calories": number,
    "macros": {
      "protein": number,
      "carbs": number,
      "fats": number
    }
  },
  "lunch": {
    "name": "Meal Name",
    "ingredients": ["item1", "item2", "item3"],
    "calories": number,
    "macros": {
      "protein": number,
      "carbs": number,
      "fats": number
    }
  },
  "snack": {
    "name": "Meal Name",
    "ingredients": ["item1", "item2", "item3"],
    "calories": number,
    "macros": {
      "protein": number,
      "carbs": number,
      "fats": number
    }
  },
  "dinner": {
    "name": "Meal Name",
    "ingredients": ["item1", "item2", "item3"],
    "calories": number,
    "macros": {
      "protein": number,
      "carbs": number,
      "fats": number
    }
  }
}

Guidelines:
- Total calories must be ${calorieTarget} ±50
- Macros distribution: ${
      goal === "lose"
        ? "Higher protein (40%), moderate carbs (30%), lower fats (30%)"
        : goal === "gain"
        ? "Higher carbs (40%), moderate protein (30%), fats (30%)"
        : "Balanced (30% protein, 40% carbs, 30% fats)"
    }
- Dietary preferences: ${dietaryPreferences}
- Excluded ingredients: ${excludedIngredients.join(", ") || "none"}
- Each meal must have 3-5 ingredients
- Calories should be rounded to nearest 50
- Macros should sum to meal calories (4cal/g protein/carbs, 9cal/g fat)
- Use common ingredient names
- Never use markdown formatting
- Maintain EXACT structure above without nesting under "meals"
- Ingredient should be name of ingredient and amount needed for that meal ! 

Output ONLY the raw JSON without any additional text or explanations.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();

    // Clean response
    text = text.replace(/```json|```/g, "").trim();

    // Parse and validate structure
    const mealPlan = JSON.parse(text);

    // Add user ID to meal plan (assuming you have authentication middleware)
    mealPlan.user = req.user.userId;

    // Validation checks
    const requiredMeals = ["breakfast", "lunch", "snack", "dinner"];
    const isValid = requiredMeals.every(
      (meal) =>
        mealPlan[meal]?.name &&
        mealPlan[meal]?.ingredients?.length >= 3 &&
        mealPlan[meal]?.calories &&
        mealPlan[meal]?.macros
    );

    if (!isValid || !mealPlan.totalCalories || !mealPlan.totalMacros) {
      throw new Error("Invalid meal plan structure received from AI");
    }

    // Return in correct format for createMealPlan
    res.json({
      mealPlan: {
        ...mealPlan,
        user: req.user.userId, // Ensure user ID is included
      },
    });
  } catch (error) {
    throw new CustomError.BadRequestError(
      `Meal plan generation failed: ${error.message}`
    );
  }
};
