import { useDispatch } from "react-redux";
import { useGetCurrentUserQuery } from "../redux/api/authApiSlice";
import { setCurrentUser } from "../redux/features/authSlice";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "./Loader";

const PrivateRoute = () => {
  const { data: currentUser, isLoading, refetch } = useGetCurrentUserQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(setCurrentUser(currentUser.currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!currentUser) {
    return <Navigate to={"/login"} replace />;
  }

  if (currentUser) {
    return (
      <section>
        <Outlet />
      </section>
    );
  }
};
export default PrivateRoute;
