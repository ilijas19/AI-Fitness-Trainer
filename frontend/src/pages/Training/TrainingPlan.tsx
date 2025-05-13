import TrainingPlanForm from "../../components/forms/TrainingPlanForm";
import Loader from "../../components/Loader";
import { useGetTrainingPlanQuery } from "../../redux/api/trainingPlanApiSlice";
import TodaysWorkout from "../../components/training/TodaysWorkout";
import Session from "../../components/training/Session";

const TrainingPlan = () => {
  const { data: trainingPlan, isLoading: trainingPlanLoading } =
    useGetTrainingPlanQuery();

  if (trainingPlanLoading) return <Loader />;

  return (
    <div className="min-h-screen ">
      {!trainingPlan ? (
        <TrainingPlanForm />
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
          </ul>
        </section>
      )}
    </div>
  );
};

export default TrainingPlan;
