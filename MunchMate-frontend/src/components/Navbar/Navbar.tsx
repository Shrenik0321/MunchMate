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

const Navbar = () => {
  const navigate = useNavigate();

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

        <div className="hidden sm:flex items-center gap-4 font-semibold">
          <div>
            <p>hellouser@gmail.com</p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CircleUserRound />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem onClick={() => navigate("/manage-restaurant")}>
                <Gauge className="mr-2 h-4 w-4" />
                <span>Manage Restaurant</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
