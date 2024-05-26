import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Browse from "./pages/Browse/Browse";
import Item from "./pages/Item/Item";

function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/item/:id" element={<Item />} />
          <Route />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
