import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllRestaurantItems from "../AllRestaurantItems/AllRestaurantItems";
import UpdateRestaurant from "../UpdateRestaurant/UpdateRestaurant";

const AdminRestaurantItems = () => {
  return (
    <div>
      <Tabs defaultValue="account">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="update-restaurant">Update Restaurant</TabsTrigger>
          <TabsTrigger value="restaurant-items">Restaurant Items</TabsTrigger>
        </TabsList>
        <TabsContent value="update-restaurant">
          <UpdateRestaurant />
        </TabsContent>
        <TabsContent value="restaurant-items">
          <AllRestaurantItems />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminRestaurantItems;
