import { useAuthContext } from "@/hooks/useAuthContext";
import { Home, LogOut, Pencil, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { userSignOut } from "@/api/userSignOut";
import { handleToastError, handleToastSuccess } from "@/utils/toast";

const SearchBar = () => {
  return (
    <div className="flex w-full items-center space-x-2">
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
          <Search size={20} color="#f97316" />
        </span>
        <Input
          type="search"
          placeholder="Search"
          className="pl-10 border-gray-700 w-full"
        />
      </div>
    </div>
  );
};

const AdminTopBar = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuthContext();

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
    <div className="sticky top-0 z-50 border-b bg-white text-black">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div>
          <SearchBar />
        </div>
        {auth && (
          <div className="flex items-center gap-4 font-semibold">
            <div>
              <p>{auth.name}</p>
            </div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <ChevronDownIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/")}>
                    <Home className="mr-2 h-4 w-4" />
                    <span>Home</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/edit-profile")}>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTopBar;
