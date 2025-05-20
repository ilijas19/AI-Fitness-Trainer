import { useEffect, useState } from "react";
import { FaLock, FaRegEnvelope, FaUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { IsApiError } from "../../utils/IsApiError";
import { toast } from "react-toastify";
import {
  useGetCurrentUserQuery,
  useRegisterMutation,
} from "../../redux/api/authApiSlice";
import Loader from "../../components/Loader";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const navigate = useNavigate();

  const { data: currentUser, isLoading: currentUserLoading } =
    useGetCurrentUserQuery();

  const [registerApiHandler, { isLoading: registerLoading }] =
    useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await registerApiHandler({
        username,
        email,
        password,
      }).unwrap();
      toast.success(res.msg);
      navigate("/login");
    } catch (error) {
      if (IsApiError(error)) {
        toast.error(error.data.msg);
      } else {
        toast.error("Something Went Wrong");
      }
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  if (currentUserLoading) {
    return <Loader />;
  }

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
          Register Account
        </p>
        <label className="mb-0.5 text-gray-200">Username</label>
        <div className="flex items-center gap-2 border-2 border-gray-600 rounded-lg sm:py-2 py-1.5 px-3 focus-within:border-emerald-600 mb-2">
          <FaUser className="text-emerald-600" />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter Username"
            className="outline-none"
          />
        </div>
        <label className="mb-0.5 text-gray-200">Email Address</label>
        <div className="flex items-center gap-2 border-2 border-gray-600 rounded-lg sm:py-2 py-1.5 px-3 focus-within:border-emerald-600 mb-2">
          <FaRegEnvelope className="text-emerald-600" />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter Your Email"
            className="outline-none"
          />
        </div>
        <label className="mb-0.5 text-gray-200">Password</label>
        <div className="flex items-center gap-2 border-2 border-gray-600 rounded-lg sm:py-2 py-1.5 px-3 focus-within:border-emerald-600 mb-2">
          <FaLock className="text-emerald-600" />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter Password"
            className="outline-none"
          />
        </div>
        <label className="mb-0.5 text-gray-200">Repeat Password</label>
        <div className="flex items-center gap-2 border-2 border-gray-600 rounded-lg sm:py-2 py-1.5 px-3 focus-within:border-emerald-600 ">
          <FaLock className="text-emerald-600" />
          <input
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            type="password"
            placeholder="Repeat Password"
            className="outline-none"
          />
        </div>
        <button
          disabled={registerLoading}
          className="py-1.5 bg-emerald-700 mt-4 rounded-lg font-semibold cursor-pointer hover:bg-emerald-600 transition-colors"
        >
          Sign Up
        </button>
      </form>
      <p className="text-center text-gray-300 not-sm:text-sm mt-4">
        Already a member?{" "}
        <Link
          to={"/login"}
          className="text-emerald-600 font-semibold hover:text-emerald-500 transition-colors"
        >
          Sign In
        </Link>
      </p>
    </section>
  );
};
export default Register;
