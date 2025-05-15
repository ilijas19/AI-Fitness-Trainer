import TrainingPlanForm from "../../components/forms/TrainingPlanForm";
import Loader from "../../components/Loader";
import { useGetTrainingPlanQuery } from "../../redux/api/trainingPlanApiSlice";
import TodaysWorkout from "../../components/training/TodaysWorkout";
import Session from "../../components/training/Session";
import { useState } from "react";
import Modal from "../../components/Modal";
import DeleteTrainingForm from "../../components/forms/DeleteTrainingForm";

const TrainingPlan = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const {
    data: trainingPlan,
    isLoading: trainingPlanLoading,
    refetch: refetchTraining,
  } = useGetTrainingPlanQuery();

  if (trainingPlanLoading) return <Loader />;

  return (
    <div className="min-h-screen ">
      {!trainingPlan ? (
        <TrainingPlanForm refetch={refetchTraining} />
      ) : (
        <section className="max-w-[900px] mx-auto py-4">
          {/* header */}
          <div className="flex flex-col gap-2">
            <h1 className="sm:text-3xl text-xl text-emerald-500 font-bold">
              {trainingPlan.title}
            </h1>
            <p className="text-gray-400">{trainingPlan.description}</p>
            <p className="text-gray-500 text-sm">
              Created At {trainingPlan.createdAt.toString().split("T")[0]}
            </p>
          </div>
          {/* todays workout */}
          <TodaysWorkout sessions={trainingPlan.sessions} />
          <h2 className="mt-5 text-gray-300 sm:text-2xl text-xl ">
            Full Workout{" "}
          </h2>
          <ul className="flex flex-col gap-2">
            {trainingPlan.sessions.map((session) => (
              <Session key={session._id} session={session} />
            ))}
            <button
              onClick={() => setDeleteModalOpen(true)}
              className="bg-red-700 font-semibold self-end px-3 py-0.5 rounded-md mt-1 cursor-pointer hover:bg-red-800 transition-all duration-300"
            >
              Delete
            </button>
          </ul>
          <Modal
            isModalOpen={isDeleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
          >
            <DeleteTrainingForm onClose={() => setDeleteModalOpen(false)} />
          </Modal>
        </section>
      )}
    </div>
  );
};

export default TrainingPlan;
