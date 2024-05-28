import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Browse from "./pages/Browse/Browse";
import Item from "./pages/Item/Item";
import ManageRestaurant from "./pages/ManageRestaurant/ManageRestaurant";
import OrderStatus from "./pages/OrderStatus/OrderStatus";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/item/:id" element={<Item />} />

          {/* Private Routes */}
          <Route path="/order-status" element={<OrderStatus />} />
          <Route />
        </Route>

        <Route path="/manage-restaurant" element={<ManageRestaurant />} />
      </Routes>
    </div>
  );
}

export default App;
