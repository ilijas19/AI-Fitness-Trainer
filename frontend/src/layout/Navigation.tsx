import { FaHome, FaTimes, FaBars } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"; // Add state for mobile menu toggle
import { CiLogout } from "react-icons/ci";
import { useLogoutMutation } from "../redux/api/authApiSlice";
import { IsApiError } from "../utils/IsApiError";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/authSlice";
import { apiSlice } from "../redux/api/apiSlice";
const phoneNavItems = [
  {
    label: "Home",
    icon: <FaHome size={24} className="text-emerald-500" />,
    to: "/",
  },
  {
    label: "Progress",
    icon: <GiProgression size={24} className="text-emerald-500" />,
    to: "/progress",
  },
];
const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  const [logoutApiHandler] = useLogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await logoutApiHandler().unwrap();
      dispatch(logout());
      dispatch(apiSlice.util.resetApiState());
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

  return (
    <nav className="border-b border-gray-700 px-3 py-2 flex justify-between items-center shadow-lg">
      <h2 className="font-semibold sm:text-2xl text-xl">Fitness AI</h2>

      <ul className="hidden sm:flex gap-6">
        {phoneNavItems.map((item, index) => (
          <li key={index}>
            <Link to={item.to} className="hover:text-emerald-500">
              {item.label}
            </Link>
          </li>
        ))}
        <li>
          <p
            onClick={handleLogout}
            className="hover:text-red-500 text-red-600 cursor-pointer"
          >
            Logout
          </p>
        </li>
      </ul>

      <button
        className="sm:hidden text-emerald-500"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <FaTimes size={23} /> : <FaBars size={23} />}
      </button>

      {isMobileMenuOpen && (
        <ul className="fixed bg-gray-700 flex flex-col gap-2 sm:hidden right-0 top-0 h-full w-60 p-3  z-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Menu</h2>
            <button
              className="cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaTimes size={20} className="text-red-500" />
            </button>
          </div>
          {phoneNavItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
              className="flex items-center gap-2 hover:translate-x-1 cursor-pointer py-2 transition-all duration-300 hover:bg-gray-600 rounded px-2"
            >
              {item.icon}
              <p>{item.label}</p>
            </Link>
          ))}
          <div
            onClick={handleLogout}
            className="flex items-center gap-2 hover:translate-x-1 cursor-pointer py-2 transition-all duration-300 hover:bg-gray-600 rounded px-2"
          >
            <CiLogout size={26} className="text-red-600" />
            <p className="text-red-600 font-semibold">Logout</p>
          </div>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
