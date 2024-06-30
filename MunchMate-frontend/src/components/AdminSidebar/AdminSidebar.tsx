import { Home, Utensils } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold pb-6">Manage Restaurant</h2>
      <div className="space-y-6">
        <div
          className="flex items-center space-x-2 cursor-pointer rounded-md p-3 hover:bg-gray-200 transition-colors duration-200"
          onClick={() => {
            navigate("/manage-restaurant");
          }}
        >
          <Home className="w-5 h-5" />
          <span>Overview</span>
        </div>
        <div
          className="flex items-center space-x-2 cursor-pointer rounded-md p-3 hover:bg-gray-200 transition-colors duration-200"
          onClick={() => {
            navigate("/add-restaurant");
          }}
        >
          <Utensils className="w-5 h-5" />
          <span>Add Restaurant</span>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
