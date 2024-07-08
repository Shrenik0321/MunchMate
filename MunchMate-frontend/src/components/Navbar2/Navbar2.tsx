import { useLocation, useNavigate } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Button } from "../ui/button";
import Cart from "../Cart/Cart";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth } = useAuthContext();
  const location = useLocation();

  return (
    <nav className="sticky bg-white opacity-[.8] top-0 z-50 shadow-md">
      <div className="flex items-center justify-between px-2 md:px-6 lg:px-8 xl:px-12 py-2 bg-white">
        <div className="flex items-center w-full">
          <div className="mr-3">
            <SideBar />
          </div>

          <div className="flex-shrink-0">
            <p
              className="text-3xl font-semibold hover:text-orange-500 cursor-pointer"
              onClick={() => navigate("/")}
            >
              MunchMate
            </p>
          </div>

          <div className="flex-grow mx-20 w-full">
            <SearchBar />
          </div>

          <div className="flex-shrink-0 mx-10">
            <Cart />
          </div>
        </div>

        {auth ? (
          <div className="hidden sm:flex items-center gap-2 font-semibold">
            <p className="whitespace-nowrap">Welcome, {auth.name}</p>
          </div>
        ) : (
          <div className="flex gap-2">
            <div>
              <Button
                className="bg-orange-500 rounded-full"
                onClick={() => {
                  navigate("/sign-in", { state: { from: location } });
                }}
              >
                Login
              </Button>
            </div>

            <div>
              <Button
                className="bg-orange-500 rounded-full"
                onClick={() => {
                  navigate("/sign-up");
                }}
              >
                Register
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
