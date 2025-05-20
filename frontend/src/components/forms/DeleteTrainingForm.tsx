import { toast } from "react-toastify";
import { IsApiError } from "../../utils/IsApiError";
import { useDeleteTrainingPlanMutation } from "../../redux/api/trainingPlanApiSlice";

type FormProps = {
  onClose: () => void;
};
const DeleteTrainingForm = ({ onClose }: FormProps) => {
  const [deleteApiHandler, { isLoading: deleteLoading }] =
    useDeleteTrainingPlanMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await deleteApiHandler().unwrap();
      location.reload();
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
      className="flex flex-col items-center gap-2 mt-6"
    >
      <h2 className="text-xl font-semibold mb-2 ">Delete Training Plan</h2>
      <p className="text-gray-300 text-center">
        Are you sure you want to{" "}
        <span className="text-red-600 font-semibold">DELETE</span> your current
        training plan? This action cannot be undone.
      </p>
      <div className="flex gap-3 mt-2">
        <button
          onClick={onClose}
          type="button"
          className="px-3 py-1   text-gray-800 font-semibold bg-white rounded-md cursor-pointer hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          disabled={deleteLoading}
          type="submit"
          className="px-3 py-1  bg-red-700 text-white rounded-md font-semibold cursor-pointer hover:bg-red-800 transition-colors"
        >
          Delete
        </button>
      </div>
    </form>
  );
};
export default DeleteTrainingForm;
