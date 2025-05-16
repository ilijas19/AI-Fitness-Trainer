import { apiSlice } from "./apiSlice";
import { MEAL_URL } from "../constants";
import type {
  GetMyMealPlansRes,
  MealPlan,
  MessageRes,
  UpdateMealPlanArg,
} from "../../types";

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
    deleteMealPlan: builder.mutation<MessageRes, string>({
      query: (mealId) => ({
        url: `${MEAL_URL}/${mealId}`,
        method: "DELETE",
      }),
    }),
    updateMealPlan: builder.mutation<MessageRes, UpdateMealPlanArg>({
      query: ({ newMealPlan, existingMealPlanId }) => ({
        url: `${MEAL_URL}/${existingMealPlanId}`,
        method: "PATCH",
        body: { newMealPlan },
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
