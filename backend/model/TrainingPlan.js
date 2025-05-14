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
      required: true,
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
    type: {
      type: String,
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
            },
            sets: {
              type: Number,
              required: true,
              min: 1,
            },
            reps: {
              type: Number,
              required: true,
              min: 1,
            },
            restBetweenSets: {
              type: Number,
            },
          },
        ],
        focusArea: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("TrainingPlan", trainingPlanSchema);
