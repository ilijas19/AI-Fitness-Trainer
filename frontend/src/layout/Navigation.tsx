import { FaHome, FaUser, FaTimes, FaBars } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useState } from "react"; // Add state for mobile menu toggle

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
  {
    label: "Profile",
    icon: <FaUser size={24} className="text-emerald-500" />,
    to: "/profile",
  },
];

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  return (
    <nav className="border-b border-gray-700 px-3 py-2 flex justify-between items-center shadow-lg">
      <h2 className="font-semibold sm:text-2xl text-xl">Fitness AI</h2>

      {/* Desktop Navigation (hidden on mobile) */}
      <ul className="hidden sm:flex gap-6">
        {phoneNavItems.map((item, index) => (
          <li key={index}>
            <Link to={item.to} className="hover:text-emerald-500">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Hamburger Button */}
      <button
        className="sm:hidden text-emerald-500"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <FaTimes size={23} /> : <FaBars size={23} />}
      </button>

      {/* Mobile Menu (conditionally rendered) */}
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
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
