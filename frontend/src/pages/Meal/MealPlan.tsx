import Loader from "../../components/Loader";
import TotalsBox from "../../components/meal/TotalsBox";
import { useGetMealPlansQuery } from "../../redux/api/mealPlanApiSlice";
import type { MealPlan } from "../../types";
import Meal from "../../components/meal/Meal";
import MealPlanForm from "../../components/forms/MealPlanForm";

const MealPlan = () => {
  const {
    data: mealPlans,
    isLoading: mealPlansLoading,
    refetch: refetchMeals,
  } = useGetMealPlansQuery();

  if (mealPlansLoading) {
    return <Loader />;
  }
  console.log(mealPlans);

  const hasMealPlans = mealPlans!.mealPlans?.length > 0;

  return !hasMealPlans ? (
    <MealPlanForm refetch={refetchMeals} />
  ) : (
    <section className="bg-gray-700 mt-4 p-4 rounded-lg shadow-xl">
      {/* totals */}
      <div className="flex justify-between">
        <h2 className="font-semibold text-xl ">Daily Totals</h2>
        <button className="bg-white  text-gray-950 hover:bg-gray-300 font-semibold px-3 rounded cursor-pointer transition-colors">
          Options
        </button>
      </div>
      <ul className="flex flex-wrap  mt-3 gap-3 gap-y-4 xl:justify-around justify-center">
        <TotalsBox
          label="Calories"
          number={mealPlans!.mealPlans[0].totalCalories}
          color="text-gray-300"
        />
        <TotalsBox
          label="Protein"
          number={mealPlans!.mealPlans[0].totalMacros.totalProtein}
          color="text-emerald-600"
        />
        <TotalsBox
          label="Carbs"
          number={mealPlans!.mealPlans[0].totalMacros.totalCarbs}
          color="text-yellow-600"
        />{" "}
        <TotalsBox
          label="Fats"
          number={mealPlans!.mealPlans[0].totalMacros.totalFats}
          color="text-red-600"
        />
      </ul>
      {/* MEALS */}
      <h2 className="font-semibold text-xl mt-3  text-gray-300 border-b border-gray-600 ">
        Meals
      </h2>
      <ul className="mb-8">
        <Meal meal={mealPlans!.mealPlans[0].breakfast} label="Breakfast" />
        <Meal meal={mealPlans!.mealPlans[0].dinner} label="Dinner" />
        <Meal meal={mealPlans!.mealPlans[0].snack} label="Snack" />
        <Meal meal={mealPlans!.mealPlans[0].lunch} label="Lunch" />
      </ul>
    </section>
  );
};
export default MealPlan;
