import { useLocation, Navigate, Outlet } from "react-router-dom"; // baseAxios should be imported from your utils
import { useAuthContext } from "@/hooks/useAuthContext";

const AdminPrivateRoute = () => {
  const location = useLocation(); // Ensuring location is defined
  const { auth } = useAuthContext();

  return auth && auth.role.includes("Admin") ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorised" state={{ from: location }} replace />
  );
};

export default AdminPrivateRoute;
