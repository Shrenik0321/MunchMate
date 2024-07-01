import { Home, Utensils, NotepadText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Overview", icon: Home, path: "/admin/overview" },
    { label: "Orders", icon: NotepadText, path: "/admin/orders" },
  ];

  const restaurantItems = [
    { label: "Restaurants", path: "/admin/restaurants" },
    { label: "Add Restaurant", path: "/admin/add-restaurant" },
  ];

  return (
    <div className="flex flex-col h-full p-6 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-2xl font-bold pb-6 text-gray-800 dark:text-gray-200">
        Manage Restaurant
      </h2>
      <div className="space-y-6">
        {menuItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className="flex items-center space-x-2 justify-start w-full text-left text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            onClick={() => navigate(item.path)}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Button>
        ))}

        <Accordion type="single" collapsible>
          <AccordionItem value="restaurants">
            <AccordionTrigger className="flex items-center space-x-2 w-full text-left text-gray-700 dark:text-gray-300 p-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
              <Utensils className="w-5 h-5" />
              <span>Restaurants</span>
            </AccordionTrigger>
            <AccordionContent className="pl-6">
              {restaurantItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="flex items-center space-x-2 justify-start w-full text-left text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                  onClick={() => navigate(item.path)}
                >
                  <span>{item.label}</span>
                </Button>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default AdminSidebar;
