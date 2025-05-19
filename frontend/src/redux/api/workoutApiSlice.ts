import { apiSlice } from "./apiSlice";
import { WORKOUT_URL } from "../constants";
import type { CreateWorkoutArgs, MessageRes, Workout } from "../../types";

const workoutApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createWorkout: builder.mutation<MessageRes, CreateWorkoutArgs>({
      query: ({ exercises, date }) => ({
        url: `${WORKOUT_URL}/create`,
        method: "POST",
        body: { exercises, date },
      }),
    }),
    getWorkoutByDate: builder.query<Workout, string>({
      query: (date) => ({
        url: `${WORKOUT_URL}/byDate/${date}`,
      }),
    }),
    deleteWorkout: builder.mutation<MessageRes, string>({
      query: (id) => ({
        url: `${WORKOUT_URL}/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateWorkoutMutation,
  useGetWorkoutByDateQuery,
  useDeleteWorkoutMutation,
} = workoutApiSlice;
