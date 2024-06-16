import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Browse from "./pages/Browse/Browse";
import Item from "./pages/Item/Item";
import ManageRestaurant from "./pages/ManageRestaurant/ManageRestaurant";
import OrderStatus from "./pages/OrderStatus/OrderStatus";
import Layout2 from "./components/Layout2/Layout2";
import DashboardSignIn from "./pages/DashboardSignIn/DashboardSignIn";
import DashboardSignUp from "./pages/DashboardSignUp/DashboardSignUp";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Unauthorised from "./pages/Unauthorised/Unauthorised";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import CheckoutWrapper from "./components/CheckoutWrapper/CheckoutWrapper";
import Checkout from "./pages/Checkout/Checkout";
import SignIn from "./pages/SignIn/SignIn";

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
        <Route path="/dashboard-sign-in" element={<DashboardSignIn />} />
        <Route path="/dashboard-sign-up" element={<DashboardSignUp />} />
        <Route path="/unauthorised" element={<Unauthorised />} />

        <Route path="/" element={<Layout2 />}>
          <Route path="/item/:id" element={<Item />} />
          <Route />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/manage-restaurant" element={<ManageRestaurant />} />
        </Route>

        <Route path="/" element={<CheckoutWrapper />}>
          <Route path="/" element={<Layout />}>
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
