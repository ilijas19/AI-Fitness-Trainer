import { apiSlice } from "./apiSlice";
import { MEAL_URL } from "../constants";
import type { GetMyMealPlansRes, MealPlan, MessageRes } from "../../types";

const mealPlanApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMealPlan: builder.mutation<MessageRes, { mealPlan: MealPlan }>({
      query: (data) => ({
        url: `${MEAL_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getMealPlans: builder.query<GetMyMealPlansRes, void>({
      query: () => ({
        url: `${MEAL_URL}`,
      }),
    }),
    //type later
    deleteMealPlan: builder.mutation({
      query: ({ mealId }) => ({
        url: `${MEAL_URL}/${mealId}`,
        method: "DELETE",
      }),
    }),
    updateMealPlan: builder.mutation({
      query: ({ mealId, data }) => ({
        url: `${MEAL_URL}/${mealId}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});
export const {
  useCreateMealPlanMutation,
  useGetMealPlansQuery,
  useDeleteMealPlanMutation,
  useUpdateMealPlanMutation,
} = mealPlanApiSlice;
