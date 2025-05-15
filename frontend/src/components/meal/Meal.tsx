import type { Meal as MealType } from "../../types";

type MealProps = {
  meal: MealType;
  label: string;
};

const Meal = ({ meal, label }: MealProps) => {
  return (
    <figure className="px-3 border-b border-gray-600 pb-4">
      <h2 className="text-lg font-semibold text-center mt-2">{label}</h2>
      <div className="mt-2  grid sm:grid-cols-2 grid-cols-1 gap-y-4">
        <ul className="list-disc">
          {/* meal info */}
          <h3 className="font-semibold  border-b border-gray-600 w-fit text-yellow-600">
            {meal.name}
          </h3>
          <p className="text-gray-300">Ingredients:</p>
          {meal.ingredients.map((i) => (
            <li className="text-gray-300 ml-5">{i}</li>
          ))}
        </ul>
        {/* nutrition */}
        <div className="bg-gray-800 shadow-xl rounded-xl p-3 sm:max-w-[400px] w-full justify-self-end  border-gray-600 border">
          <h2 className="font-semibold mb-1">Nutrition</h2>
          <ul className="grid grid-cols-2 gap-4">
            <li className="flex flex-col items-center">
              <h4 className="text-gray-300">Calories</h4>
              <p className="font-semibold">{meal.calories}</p>
            </li>
            <li className="flex flex-col items-center">
              <h4 className="text-emerald-600">Protein</h4>
              <p className="font-semibold">{meal.macros.protein}</p>
            </li>
            <li className="flex flex-col items-center">
              <h4 className="text-yellow-600">Carbs</h4>
              <p className="font-semibold">{meal.macros.carbs}</p>
            </li>
            <li className="flex flex-col items-center">
              <h4 className="text-red-600">Fats</h4>
              <p className="font-semibold">{meal.macros.fats}</p>
            </li>
          </ul>
        </div>
      </div>
    </figure>
  );
};
export default Meal;
