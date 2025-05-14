import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Excercise from "./Excercise";
import type { Session as SessionType } from "../../types";

type SessionProps = {
  session: SessionType;
};

const Session = ({ session }: SessionProps) => {
  const [excerciseDropdownOpen, setExcerciseDropdownOpen] = useState(false);

  return (
    <figure className="border-2 border-gray-600 py-5 px-4  rounded-lg  mt-3 ">
      <div className="flex items-center gap-4 ">
        <h2
          className={`${
            excerciseDropdownOpen ? "text-emerald-600" : "text-gray-500"
          } font-semibold sm:text-xl text-lg`}
        >
          {session.day.slice(0, 1).toUpperCase() + session.day.slice(1)}
        </h2>
        <p
          className={`${
            excerciseDropdownOpen ? "bg-emerald-700" : "bg-gray-700"
          } text-sm rounded-lg  px-2 py-0.5  text-gray-200`}
        >
          {session.focusArea.slice(0, 1).toUpperCase() +
            session.focusArea.slice(1)}
        </p>
        <IoIosArrowDown
          onClick={() => setExcerciseDropdownOpen(!excerciseDropdownOpen)}
          size={24}
          className="ml-auto text-gray-600 cursor-pointer z-40"
        />
      </div>
      <ul
        className={`flex flex-col gap-4 ${
          excerciseDropdownOpen && "mt-3"
        } overflow-hidden transition-all duration-300 ease-in-out ${
          excerciseDropdownOpen ? "max-h-[2000px]" : "max-h-0"
        }`}
      >
        {session?.exercises.map((exercise) => (
          <Excercise key={exercise._id} excercise={exercise} />
        ))}
      </ul>
    </figure>
  );
};
export default Session;
