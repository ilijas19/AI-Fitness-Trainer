import { useState } from "react";
import { FaLock, FaRegEnvelope } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/authApiSlice";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/features/authSlice";
import { IsApiError } from "../../utils/IsApiError";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginApiHandler, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await loginApiHandler({ email, password }).unwrap();
      toast.success(res.msg);
      dispatch(setCurrentUser(res.currentUser));
      navigate("/");
    } catch (error) {
      if (IsApiError(error)) {
        toast.error(error.data.msg);
      } else {
        toast.error("Something Went Wrong");
      }
    }
  };

  return (
    <section className="sm:px-4 px-2">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[600px] h-fit mx-auto  shadow-xl mt-12 bg-gray-700  rounded-lg p-4 px-6 flex flex-col "
      >
        <h2 className="font-bold sm:text-2xl text-xl text-center mb-1">
          Welcome
        </h2>
        <p className="text-center text-gray-300 not-sm:text-sm mb-2">
          Sign In to Continue
        </p>
        <label className="mb-0.5 text-gray-200">Email Address</label>
        <div className="flex items-center gap-2 border-2 border-gray-600 rounded-lg sm:py-2 py-1.5 px-3 focus-within:border-emerald-600 mb-2">
          <FaRegEnvelope className="text-emerald-600" />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter Your Email..."
            className="outline-none"
          />
        </div>
        <label className="mb-0.5 text-gray-200">Password</label>
        <div className="flex items-center gap-2 border-2 border-gray-600 rounded-lg sm:py-2 py-1.5 px-3 focus-within:border-emerald-600">
          <FaLock className="text-emerald-600" />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter Password"
            className="outline-none"
          />
        </div>
        <button
          disabled={isLoading}
          className="py-1.5 bg-emerald-700 mt-4 rounded-lg font-semibold cursor-pointer hover:bg-emerald-600 transition-colors"
        >
          Sign In
        </button>
        <p className="text-center text-gray-300 not-sm:text-sm mt-4">
          Don't have an account?{" "}
          <Link
            to={"/register"}
            className="text-emerald-600 font-semibold hover:text-emerald-500 transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </section>
  );
};
export default Login;
