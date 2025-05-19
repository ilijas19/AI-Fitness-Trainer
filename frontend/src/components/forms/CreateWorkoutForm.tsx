import { FaDumbbell, FaTrash } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { IsApiError } from "../../utils/IsApiError";
import { toast } from "react-toastify";
import { useCreateWorkoutMutation } from "../../redux/api/workoutApiSlice";

type FormProps = {
  onClose: () => void;
  refetch: () => void;
  date: string;
  setDate: (str: string) => void;
};

type Exercise = {
  name: string;
  sets: number;
  reps: number;
  weight: number;
};

const CreateWorkoutForm = ({ onClose, date, setDate, refetch }: FormProps) => {
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      name: "",
      sets: 4,
      reps: 12,
      weight: 20,
    },
  ]);

  const [createWorkoutApiHandler, { isLoading }] = useCreateWorkoutMutation();

  const addExercise = () => {
    setExercises([...exercises, { name: "", sets: 4, reps: 12, weight: 20 }]);
  };

  const handleExerciseChange = (
    index: number,
    field: keyof Exercise,
    value: string | number
  ) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field] = value as never;
    setExercises(updatedExercises);
  };

  const handleDelete = (index: number) => {
    if (exercises.length > 1) {
      setExercises(exercises.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await createWorkoutApiHandler({
        date,
        exercises,
      }).unwrap();
      toast.success(res.msg);
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
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col max-h-[85vh]  custom-scrollbar px-1"
    >
      <IoIosClose
        onClick={onClose}
        className="absolute right-0 -top-2 cursor-pointer "
        size={33}
      />
      <h2 className="flex items-center gap-3 text-emerald-500 font-semibold text-xl">
        <FaDumbbell size={30} />
        Log Workout
      </h2>
      <label className="text-gray-300 mt-4">Workout Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="bg-gray-700 border-gray-600 border rounded p-2 mt-0.5"
      />
      {/* excercises */}
      <h2 className=" font-semibold mt-4 text-lg flex justify-between items-center">
        Exercises{" "}
        <span
          className="flex gap-1 items-center cursor-pointer text-emerald-600 hover:text-emerald-500 transition-colors"
          onClick={addExercise}
        >
          <FaPlus className="" />
          <p className="text-base ">Add Excercise</p>
        </span>
      </h2>
      <ul className="flex flex-col gap-6 mt-2 overflow-y-scroll">
        {exercises.map((excercise, index) => (
          <li
            key={index}
            className="border border-gray-500 bg-gray-700 rounded-lg p-5 flex flex-col"
          >
            <h3 className="font-semibold flex justify-between items-center mb-2.5">
              Excercise #{index + 1}
              {exercises.length > 1 && (
                <FaTrash
                  onClick={() => handleDelete(index)}
                  className="text-red-500 cursor-pointer"
                />
              )}
            </h3>
            <label className=" text-gray-400">Name</label>
            <input
              required
              value={excercise.name}
              onChange={(e) =>
                handleExerciseChange(index, "name", e.target.value)
              }
              type="text"
              placeholder="e.g. Bench Press"
              className="border border-gray-500 bg-gray-800 py-2 rounded-lg px-3 outline-none"
            />
            <div className="mt-3 grid grid-cols-3 gap-5">
              <div className="flex flex-col">
                <label className="text-gray-400">Sets</label>
                <input
                  required
                  min={1}
                  value={excercise.sets}
                  onChange={(e) =>
                    handleExerciseChange(index, "sets", e.target.value)
                  }
                  placeholder="Sets"
                  type="number"
                  className="bg-gray-800 border-gray-500 border rounded-lg p-2 outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-400">Reps</label>
                <input
                  required
                  value={excercise.reps}
                  onChange={(e) =>
                    handleExerciseChange(index, "reps", e.target.value)
                  }
                  min={1}
                  placeholder="Reps"
                  type="number"
                  className="bg-gray-800 border-gray-500 border rounded-lg p-2 outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-400">Weight</label>
                <input
                  required
                  value={excercise.weight}
                  onChange={(e) =>
                    handleExerciseChange(index, "weight", e.target.value)
                  }
                  min={1}
                  placeholder="Weight (kg)"
                  type="number"
                  className="bg-gray-800 border-gray-500 border rounded-lg p-2 outline-none"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-emerald-700 mt-4 font-semibold py-2 rounded-lg cursor-pointer hover:bg-emerald-600 transition-colors"
      >
        Save Workout
      </button>
    </form>
  );
};
export default CreateWorkoutForm;
