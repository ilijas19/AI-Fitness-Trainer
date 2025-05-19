import Loader from "../../components/Loader";
import TotalsBox from "../../components/meal/TotalsBox";
import { useGetMealPlansQuery } from "../../redux/api/mealPlanApiSlice";
import Meal from "../../components/meal/Meal";
import MealPlanForm from "../../components/forms/MealPlanForm";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Modal from "../../components/Modal";
import DeleteMealPlanForm from "../../components/forms/DeleteMealPlanForm";
import UpdateMeal from "../../components/meal/UpdateMeal";

const MealPlan = () => {
  const [isOptionsMenuOpen, setOptionsMenuOpen] = useState<boolean>(false);
  const [isDeletePlanMenuOpen, setDeletePlanMenuOpen] =
    useState<boolean>(false);
  const [isUpdateMenuOpen, setUpdateMenuOpen] = useState<boolean>(false);

  const {
    data: mealPlans,
    isLoading: mealPlansLoading,
    refetch: refetchMeals,
  } = useGetMealPlansQuery();

  if (mealPlansLoading) {
    return <Loader />;
  }

  const hasMealPlans = mealPlans!.mealPlans?.length > 0;

  return !hasMealPlans ? (
    <MealPlanForm refetch={refetchMeals} />
  ) : (
    <section className="bg-gray-700 mt-4 p-4 rounded-lg shadow-xl relative">
      {/* totals */}
      <div className="flex justify-between">
        <h2 className="font-semibold text-xl ">Daily Totals</h2>

        <BsThreeDots
          className="cursor-pointer"
          size={24}
          onClick={() => setOptionsMenuOpen(!isOptionsMenuOpen)}
        />
        {isOptionsMenuOpen && (
          <div className="absolute  font-semibold right-4 top-11 bg-gray-800 border border-gray-400 rounded overflow-hidden">
            <p
              onClick={() => setUpdateMenuOpen(true)}
              className="px-2 py-1 hover:bg-gray-700 border-b  border-gray-400 cursor-pointer"
            >
              Change Meals
            </p>
            <p
              onClick={() => setDeletePlanMenuOpen(true)}
              className="px-2 py-1 hover:bg-gray-700  cursor-pointer "
            >
              Delete Plan
            </p>
          </div>
        )}
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

      <Modal
        isModalOpen={isDeletePlanMenuOpen}
        onClose={() => setDeletePlanMenuOpen(false)}
      >
        <DeleteMealPlanForm
          refetch={refetchMeals}
          onClose={() => setDeletePlanMenuOpen(false)}
          deletingId={mealPlans!.mealPlans[0]._id}
        />
      </Modal>

      <Modal
        isModalOpen={isUpdateMenuOpen}
        onClose={() => setUpdateMenuOpen(false)}
      >
        <UpdateMeal
          mealPlan={mealPlans!.mealPlans[0]}
          onClose={() => setUpdateMenuOpen(false)}
          refetch={refetchMeals}
        />
      </Modal>
    </section>
  );
};
export default MealPlan;
