import { FaDumbbell } from "react-icons/fa";
import LinkBox from "../components/LinkBox";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { FaBowlFood } from "react-icons/fa6";
import { FaMessage } from "react-icons/fa6";
import { GiProgression } from "react-icons/gi";
const Home = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  return (
    <section className="">
      <h1 className="text-end text-gray-400 text-2xl my-2">
        Welcome, {currentUser?.username}
      </h1>
      <ul className="py-4 flex flex-wrap justify-around gap-6">
        <LinkBox
          icon={<FaDumbbell size={36} className="text-emerald-600" />}
          label="Training Plan"
          to="/trainingPlan"
        />
        <LinkBox
          icon={<FaBowlFood size={36} className="text-emerald-600" />}
          label="Meal Plan"
          to="/mealPlan"
        />{" "}
        <LinkBox
          icon={<FaMessage size={36} className="text-emerald-600" />}
          label="Trainer Chat"
          to="/trainingPlan"
        />
        <LinkBox
          icon={<GiProgression size={36} className="text-emerald-600" />}
          label="Progress"
          to="/progress"
        />
      </ul>
    </section>
  );
};
export default Home;
