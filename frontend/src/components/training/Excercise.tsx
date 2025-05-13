import { FaDumbbell } from "react-icons/fa";
import type { Excercise as ExcerciseType } from "../../types";
<FaDumbbell />;
type ExcerciseProps = {
  excercise: ExcerciseType;
};

const Excercise = ({ excercise }: ExcerciseProps) => {
  return (
    <div className="flex flex-col sm:gap-3 gap-2 bg-gray-700 rounded-lg sm:px-6 px-3 sm:py-3 py-2 relative">
      <FaDumbbell className="absolute right-3 text-emerald-700" size={24} />
      <h2 className="font-semibold sm:text-lg">{excercise.name}</h2>
      <p className="text-gray-400 not-sm:text-sm">{excercise.description}</p>
      <ul className="flex gap-2 text-gray-300 not-sm:text-sm">
        <li>Sets: {excercise.sets}</li>
        <li>Reps: {excercise.reps}</li>
        <li>Rest: {excercise.restBetweenSets}s</li>
      </ul>
      <p className="text-sm bg-gray-800 px-2 py-1 rounded-lg w-fit">
        {excercise.muscleGroup.slice(0, 1).toUpperCase() +
          excercise.muscleGroup.slice(1)}
      </p>
    </div>
  );
};
export default Excercise;
