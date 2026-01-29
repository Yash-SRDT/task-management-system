import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";

import { getUserDetails } from "../store/auth/get-loggedIn-user-details-slice";
import { logout } from "../store/auth/auth-slice";

const PrivateRoute = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, expirationTime } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserDetails());
    }
  }, [isAuthenticated, dispatch]);

  if (!isAuthenticated || (expirationTime && Date.now() > expirationTime)) {
    dispatch(logout());
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
