import { apiSlice } from "./apiSlice";
import { GEMINI_URL } from "../constants";
import type { TrainingPlanArgs, TrainingPlanRes } from "../../types";

const geminiApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    generateTrainingPlan: builder.mutation<TrainingPlanRes, TrainingPlanArgs>({
      query: (data) => ({
        url: `${GEMINI_URL}/generate-plan`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGenerateTrainingPlanMutation } = geminiApiSlice;
