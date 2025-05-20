import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetCurrentUserQuery } from "../redux/api/authApiSlice";
import { setCurrentUser } from "../redux/features/authSlice";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "./Loader";
import type { RootState } from "../redux/store";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.auth);

  const { data: queryUser, isLoading } = useGetCurrentUserQuery();

  useEffect(() => {
    if (queryUser) {
      dispatch(setCurrentUser(queryUser.currentUser));
    }
  }, [queryUser]);

  if (isLoading) {
    return <Loader />;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <section>
      <Outlet />
    </section>
  );
};

export default PrivateRoute;
