import type { MessageRes, Session, TrainingPlan } from "../../types";
import { TRAINING_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const trainingPlanApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTrainingPlan: builder.mutation<MessageRes, TrainingPlan>({
      query: (data) => ({
        url: `${TRAINING_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getTrainingPlan: builder.query<TrainingPlan, void>({
      query: () => ({
        url: `${TRAINING_URL}`,
      }),
    }),
    updateTrainingPlan: builder.mutation<MessageRes, { sessions: Session[] }>({
      query: (sessions) => ({
        url: `${TRAINING_URL}`,
        method: "PATCH",
        body: sessions,
      }),
    }),
    deleteTrainingPlan: builder.mutation<MessageRes, void>({
      query: () => ({
        url: `${TRAINING_URL}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateTrainingPlanMutation,
  useGetTrainingPlanQuery,
  useUpdateTrainingPlanMutation,
  useDeleteTrainingPlanMutation,
} = trainingPlanApiSlice;
