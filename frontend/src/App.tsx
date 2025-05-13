import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navigation from "./layout/Navigation";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";

const App = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  return (
    <div className="min-h-screen flex flex-col bg-gray-800 overflow-hidden text-white">
      <ToastContainer />
      {currentUser && <Navigation />}
      <div className="grow relative  max-w-[1200px] px-4 mx-auto w-full">
        {/* Floating emerald blobs */}
        <div className="absolute top-20 -right-20 w-72 h-72 bg-emerald-600 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-10 -left-10 w-64 h-64 bg-emerald-600 rounded-full filter blur-3xl opacity-10 "></div>
        <Outlet />
      </div>
    </div>
  );
};
export default App;
