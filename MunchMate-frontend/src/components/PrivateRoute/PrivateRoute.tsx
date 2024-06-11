import React from "react";
import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom"; // baseAxios should be imported from your utils
import { userVerify } from "@/api/userVerify";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Ensuring location is defined
  const [username, setUsername] = React.useState(null); // Initial state is null
  const [loading, setLoading] = React.useState(true); // Loading state

  React.useEffect(() => {
    const verifyCookie = async () => {
      try {
        const response = await userVerify();
        const { status, user } = response;
        if (status) {
          setUsername(user);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false after verification completes
      }
    };

    verifyCookie();
  }, [navigate, location]);

  if (loading) {
    // Render a loading indicator while verification is in progress
    return <div>Loading...</div>;
  }

  return username ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorised" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
