import { CircleUserRound } from "lucide-react";
import { LogOut } from "lucide-react";
import { Gauge } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { userSignOut } from "@/api/userSignOut";
import { handleToastError, handleToastSuccess } from "@/utils/toast";
import { Pencil } from "lucide-react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Button } from "../ui/button";

const Navbar = () => {
  const { auth, setAuth } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await userSignOut();
      setAuth(null);
      handleToastSuccess(response.message);
    } catch (err) {
      console.log(err);
      handleToastError("Something went wrong");
    }
  };

  return (
    <nav className="sticky bg-white opacity-[.8] top-0 z-50 shadow-md">
      <div className="flex items-center justify-between px-2 md:px-6 lg:px-8 xl:px-12 py-2 bg-white">
        <div className="flex items-center">
          <p
            className="text-3xl font-semibold hover:text-orange-500 cursor-pointer"
            onClick={() => navigate("/")}
          >
            MunchMate
          </p>
        </div>

        {auth ? (
          <div className="hidden sm:flex items-center gap-4 font-semibold">
            <div>
              <p>{auth && auth.email}</p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <CircleUserRound />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem
                  onClick={() => navigate("/manage-restaurant")}
                >
                  <Gauge className="mr-2 h-4 w-4" />
                  <span>Manage Restaurant</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate("/manage-restaurant")}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>Edit Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex gap-2">
            <div>
              <Button
                className="bg-orange-500"
                onClick={() => {
                  navigate("/sign-in");
                }}
              >
                Login
              </Button>
            </div>

            <div>
              <Button
                className="bg-orange-500"
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
