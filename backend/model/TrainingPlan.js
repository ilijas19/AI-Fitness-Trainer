import mongoose from "mongoose";

const trainingPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      required: true,
      type: String,
    },
    goal: {
      type: String,
      enum: ["weight loss", "muscle gain", "endurance", "strength"],
      required: true,
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
    type: {
      type: String,
      enum: ["gym", "outdoor", "home", "mixed"],
      required: true,
    },

    daysPerWeek: {
      type: Number,
      min: 1,
      max: 7,
    },
    sessions: [
      {
        day: {
          type: String,
          enum: [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
          ],
          required: true,
        },
        exercises: [
          {
            name: {
              type: String,
              required: true,
              unique: true,
              trim: true,
            },
            description: {
              type: String,
              required: true,
              trim: true,
            },
            muscleGroup: {
              type: String,
              required: true,
              enum: [
                "chest",
                "back",
                "shoulders",
                "arms",
                "legs",
                "core",
                "full body",
                "cardio",
                "flexibility",
              ],
            },
            sets: {
              type: Number,
              required: true,
              min: 1,
              max: 10,
            },
            reps: {
              type: Number,
              required: true,
              min: 1,
              max: 50,
            },
            restBetweenSets: {
              type: Number,
            },
          },
        ],
        focusArea: {
          type: String,
          enum: [
            "upper body",
            "lower body",
            "full body",
            "core",
            "cardio",
            "flexibility",
          ],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("TrainingPlan", trainingPlanSchema);
