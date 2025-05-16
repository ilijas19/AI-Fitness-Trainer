import React, { useState } from "react";
import type { MealPlan } from "../../types";
import { IsApiError } from "../../utils/IsApiError";
import { toast } from "react-toastify";
import { useGenerateUpdatedMealPlanMutation } from "../../redux/api/geminiApiSlice";
import { useUpdateMealPlanMutation } from "../../redux/api/mealPlanApiSlice";
import Loader from "../Loader";

type UpdateMealProps = {
  mealPlan: MealPlan;
  refetch: () => void;
  onClose: () => void;
};

const UpdateMeal = ({ mealPlan, refetch, onClose }: UpdateMealProps) => {
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);

  const [generateApiHandler, { isLoading: generateLoading }] =
    useGenerateUpdatedMealPlanMutation();

  const [updateApiHandler] = useUpdateMealPlanMutation();

  const toggleMeal = (mealName: string) => {
    setSelectedMeals((prev) =>
      prev.includes(mealName)
        ? prev.filter((name) => name !== mealName)
        : [...prev, mealName]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res1 = await generateApiHandler({
        mealPlan,
        mealsToUpdate: selectedMeals,
      }).unwrap();
      const res2 = await updateApiHandler({
        existingMealPlanId: mealPlan._id,
        newMealPlan: res1.mealPlan,
      }).unwrap();
      toast.success(res2.msg);
      refetch();
      onClose();
    } catch (error) {
      if (IsApiError(error)) {
        toast.error(error.data.msg);
      } else {
        toast.error("Something Went Wrong");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-emerald-400 mb-4">
        Update Your Meal Plan
      </h2>

      <div className="grid grid-cols-1 gap-3">
        {Object.entries(mealPlan).map(([mealType, meal]) => {
          if (typeof meal === "object" && "name" in meal) {
            return (
              <div
                key={mealType}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedMeals.includes(meal.name)
                    ? "border-emerald-500 bg-emerald-900/20"
                    : "border-gray-600 hover:border-gray-400"
                }`}
                onClick={() => toggleMeal(meal.name)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-300 font-semibold capitalize">
                      {mealType}
                    </h3>
                    <p className="text-emerald-400 font-medium">{meal.name}</p>
                    <div className="text-sm text-gray-400 mt-1">
                      {meal.calories} kcal · P: {meal.macros.protein}g · C:{" "}
                      {meal.macros.carbs}g · F: {meal.macros.fats}g
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedMeals.includes(meal.name)}
                    onChange={() => toggleMeal(meal.name)}
                    className="h-5 w-5 text-emerald-500 rounded focus:ring-emerald-400 border-gray-600 bg-gray-700"
                  />
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={selectedMeals.length === 0}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedMeals.length === 0
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-500"
          }`}
        >
          Replace {selectedMeals.length} Meals
        </button>
      </div>
      {generateLoading && <Loader />}
    </form>
  );
};

export default UpdateMeal;
