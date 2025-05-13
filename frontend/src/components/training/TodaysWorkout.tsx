import { IoIosArrowDown } from "react-icons/io";
import type { Session } from "../../types";
import { useState } from "react";
import Excercise from "./Excercise";

type TodaysWorkoutProps = {
  sessions: Session[];
};

const TodaysWorkout = ({ sessions }: TodaysWorkoutProps) => {
  const [excerciseDropdownOpen, setExcerciseDropdownOpen] = useState(false);

  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const dayIndex = new Date().getDay();
  const currentDay = days[dayIndex];

  const todaysWorkout = sessions.find((session) => session.day === currentDay);
  // console.log(todaysWorkout);

  return (
    <figure className="border-2 border-emerald-600 py-5 px-4  rounded-lg  mt-3">
      <div className="flex items-center gap-4 ">
        <h2 className="text-emerald-500 font-semibold sm:text-xl text-lg">
          {todaysWorkout
            ? `Today's Workout: ${
                todaysWorkout.day.slice(0, 1).toUpperCase() +
                todaysWorkout.day.slice(1)
              }`
            : `Rest Day`}
        </h2>
        <p className="0 bg-emerald-900 not-sm:text-sm rounded-lg  px-2 py-0.5 font-semibold text-gray-200">
          {todaysWorkout
            ? `${
                todaysWorkout.focusArea.slice(0, 1).toUpperCase() +
                todaysWorkout.focusArea.slice(1)
              }`
            : "Rest"}
        </p>
        <IoIosArrowDown
          onClick={() => setExcerciseDropdownOpen(!excerciseDropdownOpen)}
          size={24}
          className="ml-auto text-gray-600 cursor-pointer z-50"
        />
      </div>
      <ul
        className={`flex flex-col gap-5 ${
          excerciseDropdownOpen && "mt-3"
        } overflow-hidden transition-all duration-300 ease-in-out ${
          excerciseDropdownOpen ? "max-h-[2000px]" : "max-h-0"
        }`}
      >
        {todaysWorkout?.exercises.map((exercise) => (
          <Excercise key={exercise._id} excercise={exercise} />
        ))}
      </ul>
    </figure>
  );
};
export default TodaysWorkout;
