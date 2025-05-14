import { useState } from "react";
import { useGenerateTrainingPlanMutation } from "../../redux/api/geminiApiSlice";
import Loader from "../Loader";
import { IsApiError } from "../../utils/IsApiError";
import { toast } from "react-toastify";
import { useCreateTrainingPlanMutation } from "../../redux/api/trainingPlanApiSlice";

interface TrainingFormState {
  goal: string;
  type: string;
  level: string;
  daysPerWeek: string;
  additionalInfo: string;
}

const TrainingPlanForm = ({ refetch }: any) => {
  const [formState, setFormState] = useState<TrainingFormState>({
    goal: "",
    type: "",
    level: "",
    daysPerWeek: "",
    additionalInfo: "",
  });

  const [generateTrainingApiHandler, { isLoading: generateLoading }] =
    useGenerateTrainingPlanMutation();

  const [createTrainingApiHandler] = useCreateTrainingPlanMutation();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res1 = await generateTrainingApiHandler({
        goal: formState.goal,
        type: formState.type,
        level: formState.level,
        daysPerWeek: +formState.daysPerWeek,
        additionalInfo: formState.additionalInfo,
      }).unwrap();
      const res2 = await createTrainingApiHandler(res1.plan).unwrap();
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
        You don't have a training plan. Tell us more about yourself to create
        one!
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-[600px] mx-auto mt-5 gap-0.5"
      >
        {/* Goal Selection */}
        <label className="font-semibold text-emerald-500">Goal</label>
        <select
          name="goal"
          value={formState.goal}
          onChange={handleInputChange}
          className="border-2 border-gray-700 rounded-lg px-3 py-1.5 outline-none mb-1"
          required
        >
          <option className="bg-gray-800 " value="" disabled>
            Select your goal
          </option>
          <option className="bg-gray-800" value="strength">
            Getting Stronger
          </option>
          <option className="bg-gray-800" value="fat-loss">
            Fat Loss
          </option>
          <option className="bg-gray-800" value="weight-gain">
            Gaining Weight
          </option>
          <option className="bg-gray-800" value="speed">
            Getting Faster
          </option>
          <option className="bg-gray-800" value="health">
            Be Healthy
          </option>
        </select>

        {/* Workout Type */}
        <label className="font-semibold text-emerald-500">Type</label>
        <select
          name="type"
          value={formState.type}
          onChange={handleInputChange}
          className="bg-gray-800 border-2 border-gray-700 rounded-lg px-3 py-1.5 outline-none mb-1"
          required
        >
          <option className="bg-gray-800" value="" disabled>
            Select workout type
          </option>
          <option className="bg-gray-800" value="gym">
            Gym
          </option>
          <option className="bg-gray-800" value="street">
            Street Workout
          </option>
        </select>

        {/* Experience Level */}
        <label className="font-semibold text-emerald-500">Level</label>
        <select
          name="level"
          value={formState.level}
          onChange={handleInputChange}
          className="border-2 border-gray-700 rounded-lg px-3 py-1.5 outline-none mb-1"
          required
        >
          <option className="bg-gray-800" value="" disabled>
            Select your level
          </option>
          <option className="bg-gray-800" value="beginner">
            Beginner
          </option>
          <option className="bg-gray-800" value="intermediate">
            Intermediate
          </option>
          <option className="bg-gray-800" value="advanced">
            Advanced
          </option>
        </select>

        {/* Days Per Week */}
        <label className="font-semibold text-emerald-500">Days Per Week</label>
        <select
          name="daysPerWeek"
          value={formState.daysPerWeek}
          onChange={handleInputChange}
          className="border-2 border-gray-700 rounded-lg px-3 py-1.5 outline-none mb-1"
          required
        >
          <option className="bg-gray-800" value="" disabled>
            Select days per week
          </option>
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <option className="bg-gray-800" key={num} value={num}>
              {num}
            </option>
          ))}
        </select>

        {/* Additional Info */}
        <label className="font-semibold text-emerald-500">
          Additional Info <span className="text-gray-500">(optional)</span>
        </label>
        <textarea
          name="additionalInfo"
          value={formState.additionalInfo}
          onChange={handleInputChange}
          placeholder="Important info about yourself (e.g., previous injuries)"
          className="border-2 border-gray-700 rounded-lg px-3 py-1.5 outline-none mb-1"
        />

        <button
          type="submit"
          disabled={generateLoading}
          className={`py-1 bg-emerald-700 mt-3 font-semibold rounded-lg transition-colors
            ${
              generateLoading
                ? "opacity-75 cursor-not-allowed"
                : "cursor-pointer hover:bg-emerald-600"
            }`}
        >
          {generateLoading ? "Generating..." : "Generate"}
        </button>
      </form>

      {generateLoading && <Loader />}
    </section>
  );
};

export default TrainingPlanForm;
