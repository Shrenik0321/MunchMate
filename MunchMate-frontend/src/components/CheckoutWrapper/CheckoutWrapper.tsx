import React from "react";
import { Outlet, useNavigate, useLocation, Navigate } from "react-router-dom";
import { userVerify } from "@/api/userVerify";

const CheckoutWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Ensuring location is defined
  const [user, setUser] = React.useState(null); // Initial state is null
  const [loading, setLoading] = React.useState(true); // Loading state

  React.useEffect(() => {
    const verifyCookie = async () => {
      try {
        const response = await userVerify();
        const { status, user } = response;
        if (status) {
          if (user.role && user.role.includes("User")) {
            setUser(user);
          }
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

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
};

export default CheckoutWrapper;
