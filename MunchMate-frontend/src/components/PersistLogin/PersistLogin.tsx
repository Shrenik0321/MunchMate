import React from "react";
import { useLocation, Outlet, useNavigate } from "react-router-dom"; // baseAxios should be imported from your utils
import { userVerify } from "@/api/userVerify";
import { useAuthContext } from "@/hooks/useAuthContext";

const PersistLogin = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Ensuring location is defined
  const [loading, setLoading] = React.useState(true); // Loading state
  const { setAuth } = useAuthContext();

  React.useEffect(() => {
    const verifyCookie = async () => {
      try {
        const response = await userVerify();
        const { status, user } = response;
        if (status) {
          setAuth(user);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false after verification completes
      }
    };

    verifyCookie();
  }, [navigate, location]);

  return loading ? <div>Loading...</div> : <Outlet />;
};

export default PersistLogin;
