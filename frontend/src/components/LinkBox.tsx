import { Link } from "react-router-dom";

type BoxProps = {
  icon: React.ReactNode;
  to: string;
  label: string;
};
const LinkBox = ({ icon, to, label }: BoxProps) => {
  return (
    <Link
      to={to}
      className="shadow-xl border border-gray-700 w-60 h-46 flex items-center justify-center flex-col rounded-xl hover:bg-gray-700 transition-all duration-300 hover:border-emerald-950 cursor-pointer gap-1 z-40"
    >
      {icon}
      <p className="font-semibold">{label}</p>
    </Link>
  );
};
export default LinkBox;
