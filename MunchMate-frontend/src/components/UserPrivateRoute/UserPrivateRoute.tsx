import { useLocation, Navigate, Outlet } from "react-router-dom"; // baseAxios should be imported from your utils
import { useAuthContext } from "@/hooks/useAuthContext";

const UserPrivateRoute = () => {
  const location = useLocation(); // Ensuring location is defined
  const { auth } = useAuthContext();

  return auth && auth.role.includes("User") ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
};

export default UserPrivateRoute;
