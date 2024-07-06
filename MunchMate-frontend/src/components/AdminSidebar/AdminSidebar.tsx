import { Home, Utensils, NotepadText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

// Custom CSS to remove the underline and prevent icon rotation
const customStyles = `
  .accordion-item, .accordion-trigger {
    border-bottom: none !important;
  }
  .accordion-item {
    border: none !important;
  }
  .no-rotate .accordion-trigger-icon {
    transition: none !important;
    transform: none !important;
  }
`;

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
    <div className="flex flex-col h-full p-6 bg-gray-800 text-white">
      <style>{customStyles}</style>
      <h2 className="text-2xl font-bold pb-6">Manage Restaurant</h2>
      <div className="space-y-6">
        {menuItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className="flex items-center space-x-2 justify-start w-full text-left hover:bg-gray-200 transition-colors duration-200 rounded-lg"
            onClick={() => navigate(item.path)}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Button>
        ))}

        <Accordion type="single" collapsible>
          <AccordionItem value="restaurants" className="accordion-item">
            <AccordionTrigger className="flex items-center space-x-2 w-full text-left p-3 hover:bg-gray-200 transition-colors duration-200 rounded-lg hover:text-black no-rotate accordion-trigger">
              <Utensils className="w-5 h-5 accordion-trigger-icon" />
              <span>Restaurants</span>
            </AccordionTrigger>
            <AccordionContent className="pl-6">
              {restaurantItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="flex items-center space-x-2 justify-start w-full text-left hover:bg-gray-200 transition-colors duration-200 rounded-lg hover:text-black"
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
