import AddRestaurant from "@/pages/AddRestaurant/AddRestaurant";
import AllRestaurants from "@/pages/AllRestaurants/AllRestaurants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminRestaurants = () => {
  return (
    <div>
      <Tabs defaultValue="account">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
          <TabsTrigger value="add-restaurant">Add Restaurant</TabsTrigger>
        </TabsList>
        <TabsContent value="restaurants">
          <AllRestaurants />
        </TabsContent>
        <TabsContent value="add-restaurant">
          <AddRestaurant />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminRestaurants;
