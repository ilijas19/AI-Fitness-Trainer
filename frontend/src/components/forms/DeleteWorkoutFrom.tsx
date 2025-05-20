import { toast } from "react-toastify";
import { useDeleteWorkoutMutation } from "../../redux/api/workoutApiSlice";
import { IsApiError } from "../../utils/IsApiError";

type FormProps = {
  onClose: () => void;
  refetch: () => void;
  deletingWorkoutId: string;
};

const DeleteWorkoutFrom = ({
  onClose,
  refetch,
  deletingWorkoutId,
}: FormProps) => {
  const [deleteWorkoutApiHandler, { isLoading }] = useDeleteWorkoutMutation();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await deleteWorkoutApiHandler(deletingWorkoutId).unwrap();
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
    <form onSubmit={onSubmit} className="flex flex-col items-center gap-1 mt-6">
      <h2 className="text-xl font-semibold mb-2 ">Delete Workout</h2>
      <p className="text-gray-300 text-center">
        Are you sure you want to{" "}
        <span className="text-red-600 font-semibold">DELETE</span> your workout?
        This action cannot be undone.
      </p>
      <div className="flex gap-3 mt-3">
        <button
          onClick={onClose}
          type="button"
          className="px-3 py-1   text-gray-800 font-semibold bg-white rounded-md cursor-pointer hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          disabled={isLoading}
          type="submit"
          className="px-3 py-1  bg-red-700 text-white rounded-md font-semibold cursor-pointer hover:bg-red-800 transition-colors"
        >
          Delete
        </button>
      </div>
    </form>
  );
};
export default DeleteWorkoutFrom;
