import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Restaurants from "./pages/Restaurants/Restaurants";
import RestaurantItem from "./pages/RestaurantItem/RestaurantItem";
import OrderStatus from "./pages/OrderStatus/OrderStatus";
import Layout2 from "./components/Layout2/Layout2";
import DashboardSignIn from "./pages/DashboardSignIn/DashboardSignIn";
import DashboardSignUp from "./pages/DashboardSignUp/DashboardSignUp";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Unauthorised from "./pages/Unauthorised/Unauthorised";
import Checkout from "./pages/Checkout/Checkout";
import SignIn from "./pages/SignIn/SignIn";
import AdminPrivateRoute from "./components/AdminPrivateRoute/AdminPrivateRoute";
import UserPrivateRoute from "./components/UserPrivateRoute/UserPrivateRoute";
import PersistLogin from "./components/PersistLogin/PersistLogin";
import AdminOverview from "./pages/AdminOverview/AdminOverview";
import AdminOrders from "./pages/AdminOrders/AdminOrders";
import AddRestaurant from "./pages/AddRestaurant/AddRestaurant";
import AllRestaurants from "./pages/AllRestaurants/AllRestaurants";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import AdminRestaurantItems from "./pages/AdminRestaurantItems/AdminRestaurantItems";
import AddRestaurantItem from "./pages/AddRestaurantItem/AddRestaurantItem";

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/dashboard-sign-in" element={<DashboardSignIn />} />
        <Route path="/dashboard-sign-up" element={<DashboardSignUp />} />
        <Route path="/unauthorised" element={<Unauthorised />} />

        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/order-status" element={<OrderStatus />} />
          <Route />
        </Route>

        {/* Private Routes */}
        <Route path="/" element={<PersistLogin />}>
          <Route path="/" element={<AdminPrivateRoute />}>
            <Route path="/" element={<AdminLayout />}>
              <Route path="/admin/overview" element={<AdminOverview />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/restaurants" element={<AllRestaurants />} />
              <Route path="/admin/add-restaurant" element={<AddRestaurant />} />
              <Route
                path="/admin/restaurant/:id"
                element={<AdminRestaurantItems />}
              />
              <Route
                path="/admin/restaurant/:id/add-restaurant-item"
                element={<AddRestaurantItem />}
              />
            </Route>
          </Route>

          <Route path="/" element={<UserPrivateRoute />}>
            <Route path="/" element={<Layout />}>
              <Route path="/checkout" element={<Checkout />} />
            </Route>
          </Route>

          <Route path="/" element={<Layout2 />}>
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurant/:id" element={<RestaurantItem />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
