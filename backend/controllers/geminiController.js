import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import CustomError from "../errors/error-index.js";
dotenv.config();

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateWorkoutPlan = async (req, res) => {
  const { goal, level, type, daysPerWeek, preferences = "none" } = req.body;
  if (!goal || !level || !type || !daysPerWeek) {
    throw new CustomError.BadRequestError("All fields must be provided");
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
Generate a personalized workout plan in STRICT JSON FORMAT matching this structure:
{
  "title": "Workout Plan Title",
  "description": "Brief plan description",
  "goal": "${goal}",
  "level": "${level}",
  "type": "${type}",
  "daysPerWeek": ${daysPerWeek},
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
- ${type === "home" ? "Use bodyweight exercises" : "Use appropriate equipment"}
- Rotate focus areas between sessions
- Never use markdown formatting

Output ONLY the raw JSON without any additional text or explanations.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();

    // Clean the response
    text = text.replace(/```json|```/g, "").trim();

    // Parse and validate
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
    console.error("Workout generation error:", error);
    const statusCode = error instanceof CustomError ? error.statusCode : 500;
    res.status(statusCode).json({
      error: error.message || "Workout generation failed",
      ...(error instanceof SyntaxError && {
        details: "Invalid JSON format from AI",
      }),
    });
  }
};
