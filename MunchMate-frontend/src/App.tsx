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
import AllOrders from "./pages/AllOrders/AllOrders";
import AddRestaurant from "./pages/AddRestaurant/AddRestaurant";
import AllRestaurants from "./pages/AllRestaurants/AllRestaurants";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import AddRestaurantItem from "./pages/AddRestaurantItem/AddRestaurantItem";
import UpdateRestaurantItem from "./pages/UpdateRestaurantItem/UpdateRestaurantItem";
import UpdateRestaurant from "./pages/UpdateRestaurant/UpdateRestaurant";
import AllRestaurantItems from "./pages/AllRestaurantItems/AllRestaurantItems";
import UpdateOrder from "./pages/UpdateOrder/UpdateOrder";

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

        <Route path="/" element={<PersistLogin />}>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/order-status" element={<OrderStatus />} />
            <Route />
          </Route>

          {/* Private Routes */}
          <Route path="/" element={<AdminPrivateRoute />}>
            <Route path="/" element={<AdminLayout />}>
              <Route path="/admin/overview" element={<AdminOverview />} />
              <Route path="/admin/orders" element={<AllOrders />} />
              <Route path="/admin/restaurants" element={<AllRestaurants />} />
              <Route path="/admin/add-restaurant" element={<AddRestaurant />} />
              <Route
                path="/admin/restaurant/:id"
                element={<UpdateRestaurant />}
              />
              <Route
                path="/admin/restaurant-items/:id"
                element={<AllRestaurantItems />}
              />
              <Route
                path="/admin/restaurant/:id/add-restaurant-item"
                element={<AddRestaurantItem />}
              />
              <Route
                path="/admin/restaurant-item/:id"
                element={<UpdateRestaurantItem />}
              />
              <Route path="/admin/order/:id" element={<UpdateOrder />} />
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
