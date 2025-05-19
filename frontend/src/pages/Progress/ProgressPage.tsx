import { useState } from "react";
import { useGetWorkoutByDateQuery } from "../../redux/api/workoutApiSlice";
import Loader from "../../components/Loader";
import { FaDumbbell } from "react-icons/fa";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Modal from "../../components/Modal";
import DeleteWorkoutFrom from "../../components/forms/DeleteWorkoutFrom";
import CreateWorkoutForm from "../../components/forms/CreateWorkoutForm";

const ProgressPage = () => {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState<string>(today);

  const [isDeleteMenuOpen, setDeleteMenuOpen] = useState<boolean>(false);
  const [isCreateWorkoutModalOpen, setCreateWorkoutModalOpen] =
    useState<boolean>(false);

  const {
    data: workout,
    isLoading: workoutLoading,
    isFetching,
    refetch,
  } = useGetWorkoutByDateQuery(date, {
    skip: date === "",
    refetchOnMountOrArgChange: true,
    selectFromResult: (result) => ({
      ...result,
      data:
        isFetchBaseQueryError(result.error) && result.error.status === 404
          ? null
          : result.data,
    }),
  });

  function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === "object" && error != null && "status" in error;
  }

  if (workoutLoading || isFetching) {
    return <Loader />;
  }

  const hasWorkout = workout !== null && workout !== undefined;

  return (
    <section className="max-w-md mx-auto mt-5">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold text-emerald-400 mb-2">
          Workout Log
        </h2>
        <p className="text-gray-400 mb-8">Select date to view your progress</p>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          max={today}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100
            focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500
            transition-all cursor-pointer mb-8"
        />

        {hasWorkout ? (
          <div className="w-full bg-gray-800 rounded-xl p-2 text-center border border-gray-700 overflow-hidden">
            <div className="flex flex-col items-center ">
              <div className="bg-emerald-900/50 p-4 rounded-full mb-2">
                <FaDumbbell className="text-emerald-400 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mb-2">
                Workout
              </h3>
              {/* excercises */}
              <ul className="w-full flex flex-col gap-2">
                {workout.exercises.map((excercise) => (
                  <li
                    key={excercise._id}
                    className="flex gap-4 items-center w-full bg-gray-700 p-2 rounded"
                  >
                    <h3 className="font-semibold sm:text-lg ">
                      {excercise.name}
                    </h3>
                    <div className="ml-auto flex flex-col ">
                      <p>Sets</p>
                      <p className="text-gray-400">{excercise.sets}</p>
                    </div>
                    <div className=" flex flex-col ">
                      <p>Reps</p>
                      <p className="text-gray-400">{excercise.reps}</p>
                    </div>
                    <div className="flex flex-col ">
                      <p>Weight</p>
                      <p className="text-gray-400">{excercise.weight}</p>
                    </div>
                  </li>
                ))}
                {/* totals */}
                <div className=" border-t-2 border-gray-700 mt-1 flex justify-around pt-2 pb-1">
                  <p className="flex flex-col">
                    <span className="text-gray-400 text-sm">
                      Total Excercises
                    </span>
                    <span>{workout.exercises.length}</span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-gray-400 text-sm">Total Sets</span>
                    <span>
                      {workout.exercises.reduce(
                        (acc, curr) => acc + curr.sets,
                        0
                      )}
                    </span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-gray-400 text-sm">Total Volume</span>
                    <span>
                      {workout.exercises.reduce(
                        (acc, curr) =>
                          acc + curr.weight * curr.sets * curr.reps,
                        0
                      )}{" "}
                      kg
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => setDeleteMenuOpen(true)}
                  className="bg-red-800 cursor-pointer hover:bg-red-700 rounded font-semibold mt-3 transition-colors py-1"
                >
                  Delete
                </button>
              </ul>
            </div>
            <Modal
              isModalOpen={isDeleteMenuOpen}
              onClose={() => setDeleteMenuOpen(false)}
            >
              <DeleteWorkoutFrom
                onClose={() => setDeleteMenuOpen(false)}
                refetch={refetch}
                deletingWorkoutId={workout._id}
              />
            </Modal>
          </div>
        ) : (
          <div className="w-full bg-gray-800 rounded-xl p-8 text-center border border-gray-700">
            <div className="flex flex-col items-center">
              <div className="bg-emerald-900/50 p-4 rounded-full mb-4">
                <FaDumbbell className="text-emerald-400 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mb-2">
                No Workout Found
              </h3>
              <p className="text-gray-400 mb-6">
                You haven't logged any workouts for {date}
              </p>
              <button
                onClick={() => setCreateWorkoutModalOpen(true)}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white font-medium transition-colors cursor-pointer"
              >
                Create New Workout
              </button>
            </div>
          </div>
        )}
      </div>
      <Modal
        isModalOpen={isCreateWorkoutModalOpen}
        onClose={() => setCreateWorkoutModalOpen(false)}
      >
        <CreateWorkoutForm
          onClose={() => setCreateWorkoutModalOpen(false)}
          refetch={refetch}
          date={date}
          setDate={setDate}
        />
      </Modal>
    </section>
  );
};

export default ProgressPage;
