import Navbar2 from "../Navbar2/Navbar2";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout2 = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar2 />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout2;
