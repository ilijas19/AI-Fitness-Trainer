import { useState } from "react";
import { toast } from "react-toastify";
import { useGenerateMealPlanMutation } from "../../redux/api/geminiApiSlice";
import { IsApiError } from "../../utils/IsApiError";
import Loader from "../Loader";
import { useCreateMealPlanMutation } from "../../redux/api/mealPlanApiSlice";

type FormProps = {
  refetch: () => void;
};

type MealPlanData = {
  age: number;
  weight: number;
  height: number;
  gender: string;
  activityLevel: string;
  goal: string;
  dietaryPreferences?: string;
  excludedIngredients?: string[];
};

const MealPlanForm = ({ refetch }: FormProps) => {
  const [generateApiHandler, { isLoading: generateLoading }] =
    useGenerateMealPlanMutation();

  const [createApiHandler] = useCreateMealPlanMutation();

  // Form state
  const [age, setAge] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [gender, setGender] = useState<string>("");
  const [activityLevel, setActivityLevel] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [dietaryPreferences, setDietaryPreferences] = useState<string>("");
  const [excludedIngredients, setExcludedIngredients] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const mealPlanData: MealPlanData = {
      age,
      weight,
      height,
      gender,
      activityLevel,
      goal,
      dietaryPreferences: dietaryPreferences || undefined,
      excludedIngredients: excludedIngredients
        ? excludedIngredients
            .split(",")
            .map((i) => i.trim())
            .filter((i) => i)
        : undefined,
    };

    try {
      const res = await generateApiHandler(mealPlanData).unwrap();
      const res2 = await createApiHandler({ mealPlan: res.mealPlan }).unwrap();
      toast.success(res2.msg);
      refetch();
    } catch (error) {
      if (IsApiError(error)) {
        toast.error(error.data.msg);
      } else {
        toast.error("Something Went Wrong");
      }
    }
  };

  return (
    <section className="p-4">
      <h2 className="text-center text-2xl font-semibold">Let's Get Started</h2>
      <p className="text-center text-gray-400">
        You don't have a meal plan. Tell us more about yourself to create one!
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-[600px] mx-auto mt-2 gap-0.5"
      >
        {/* Age */}
        <label className="font-semibold text-emerald-500">Age</label>
        <input
          type="number"
          value={age || ""}
          onChange={(e) => setAge(Number(e.target.value))}
          placeholder="Enter Your Age"
          className="border-2 border-gray-700 rounded-lg px-3 py-1.5 outline-none mb-1"
          required
        />

        {/* Weight */}
        <label className="font-semibold text-emerald-500">Weight (kg)</label>
        <input
          type="number"
          value={weight || ""}
          onChange={(e) => setWeight(Number(e.target.value))}
          placeholder="Enter Your Weight"
          className="bg-gray-800 border-2 border-gray-700 rounded-lg px-3 py-1.5 outline-none mb-1"
          required
        />

        {/* Height */}
        <label className="font-semibold text-emerald-500">Height (cm)</label>
        <input
          type="number"
          value={height || ""}
          onChange={(e) => setHeight(Number(e.target.value))}
          placeholder="Enter Your Height"
          className="border-2 border-gray-700 rounded-lg px-3 py-1.5 outline-none mb-1"
          required
        />

        {/* Gender */}
        <label className="font-semibold text-emerald-500">Gender</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border-2 border-gray-700 rounded-lg px-3 py-1.5 outline-none mb-1 bg-gray-800 "
          required
        >
          <option disabled value="">
            Select your Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        {/* Activity Level */}
        <label className="font-semibold text-emerald-500">Activity Level</label>
        <select
          value={activityLevel}
          onChange={(e) => setActivityLevel(e.target.value)}
          className=" bg-gray-800  border-2 border-gray-700 rounded-lg px-3 py-1.5 outline-none mb-1"
          required
        >
          <option value="">Select activity level</option>
          <option value="sedentary">Sedentary</option>
          <option value="light">Light</option>
          <option value="moderate">Moderate</option>
          <option value="active">Active</option>
          <option value="very-active">Very Active</option>
        </select>

        {/* Goal */}
        <label className="font-semibold text-emerald-500">Goal</label>
        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="bg-gray-800   border-2 border-gray-700 rounded-lg px-3 py-1.5 outline-none mb-1"
          required
        >
          <option value="">Select your goal</option>
          <option value="lose">Weight Loss</option>
          <option value="maintain">Maintain</option>
          <option value="gain">Gaining Weight</option>
        </select>

        {/* Dietary Preferences */}
        <label className="font-semibold text-emerald-500">
          Dietary Preferences <span className="text-gray-500">(optional)</span>
        </label>
        <textarea
          value={dietaryPreferences}
          onChange={(e) => setDietaryPreferences(e.target.value)}
          placeholder="Any Special Diet Preferences"
          className="border-2 border-gray-700 rounded-lg px-3 py-1.5 outline-none mb-1"
        />

        {/* Excluded Ingredients */}
        <label className="font-semibold text-emerald-500">
          Excluded Ingredients <span className="text-gray-500">(optional)</span>
        </label>
        <textarea
          value={excludedIngredients}
          onChange={(e) => setExcludedIngredients(e.target.value)}
          placeholder="Ingredients you don't want (comma separated)"
          className="border-2 border-gray-700 rounded-lg px-3 py-1.5 outline-none mb-1"
        />

        <button
          type="submit"
          disabled={generateLoading}
          className={`py-1 bg-emerald-700 mt-3 font-semibold rounded-lg transition-colors
            ${
              generateLoading
                ? "opacity-75 cursor-not-allowed"
                : "hover:bg-emerald-600"
            }`}
        >
          {generateLoading ? "Generating..." : "Generate"}
        </button>
      </form>

      {generateLoading && <Loader />}
    </section>
  );
};

export default MealPlanForm;
