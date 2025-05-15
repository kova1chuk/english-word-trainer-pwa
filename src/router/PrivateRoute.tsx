import { Navigate, Outlet, useLocation } from "react-router-dom";

import { routes } from "@/router/routes";
import { useAppSelector } from "@/shared/config/store/hooks";

export const PrivateRoute = () => {
  const location = useLocation();
  const token = useAppSelector((state) => state.auth.token);

  if (!token) {
    return <Navigate to={routes.signin} state={{ from: location }} replace />;
  }

  return <Outlet />;
};
