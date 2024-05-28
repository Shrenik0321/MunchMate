import { useNavigate } from "react-router-dom";

import Cart from "../Cart/Cart";
import SideBar from "../SideBar/SideBar";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky bg-white opacity-[.8] top-0 z-50 shadow-md">
      <div className="flex items-center justify-between px-2 md:px-6 lg:px-8 xl:px-12 py-2 bg-white">
        <div className="flex items-center">
          <div className="mr-3">
            <SideBar />
          </div>

          <div>
            <p
              className="text-3xl font-semibold hover:text-orange-500 cursor-pointer"
              onClick={() => navigate("/")}
            >
              MunchMate
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-4 font-semibold">
          <Cart />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
