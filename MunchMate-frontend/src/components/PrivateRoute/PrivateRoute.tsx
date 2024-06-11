import React from "react";
import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom"; // baseAxios should be imported from your utils
import { baseAxios } from "@/utils/axios";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Ensuring location is defined
  const [username, setUsername] = React.useState(null); // Initial state is null
  const [loading, setLoading] = React.useState(true); // Loading state

  React.useEffect(() => {
    const verifyCookie = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
        };

        const response = await baseAxios.get(
          "http://localhost:5555/api/auth/verify",
          {
            headers: headers,
            withCredentials: true,
          }
        );

        const { status, user } = response.data;

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
