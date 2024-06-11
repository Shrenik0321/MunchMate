import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Browse from "./pages/Browse/Browse";
import Item from "./pages/Item/Item";
import ManageRestaurant from "./pages/ManageRestaurant/ManageRestaurant";
import OrderStatus from "./pages/OrderStatus/OrderStatus";
import Layout2 from "./components/Layout2/Layout2";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Unauthorised from "./pages/Unauthorised/Unauthorised";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/order-status" element={<OrderStatus />} />
          <Route />
        </Route>

        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-out" element={<SignUp />} />
        <Route path="/unauthorised" element={<Unauthorised />} />

        <Route path="/" element={<Layout2 />}>
          <Route path="/item/:id" element={<Item />} />
          <Route />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/manage-restaurant" element={<ManageRestaurant />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
