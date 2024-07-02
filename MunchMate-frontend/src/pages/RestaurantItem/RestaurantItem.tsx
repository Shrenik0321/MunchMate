import React from "react";
import { useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MenuItem from "@/components/MenuItem/MenuItem";
import BreadCrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import PaginationComponent from "@/components/Pagination/Pagination";
import { getAllRestaurantItems } from "@/api/getAllRestaurantItems";
import Loader from "@/components/Loader/Loader";

const RestaurantItem = () => {
  const location = useLocation();
  const itemData = location.state?.data;
  const [restaurantItems, setRestaurantItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const getRestaurantItems = async () => {
      setLoading(true);
      try {
        const response = await getAllRestaurantItems({});
        const { data } = response;
        if (data) {
          setRestaurantItems(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getRestaurantItems();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className="my-6 mx-12">
            <div className="my-5">
              <BreadCrumbs />
            </div>

            <div className="grid grid-rows-2">
              <div className="col-span-1 h-72">
                <img
                  src={itemData.imageUrl}
                  alt="RestaurantItem Image"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div className="col-span-1 mt-8">
                <div className="flex flex-col gap-2">
                  <div className="flex my-2 justify-between">
                    <div>
                      <p className="text-4xl font-bold cursor-pointer">
                        {itemData.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 my-2">
                    {itemData.tags.map((tagItem: any, index: number) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-gray-500"
                      >
                        {tagItem}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex my-2">
                    <div>
                      <MapPin />
                    </div>
                    <p className="text-md">{itemData.address}</p>
                  </div>
                  <div className="my-2">
                    <p className="text-[#52525b]">{itemData.description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Tabs defaultValue="all">
                <TabsList className="flex w-full">
                  <TabsTrigger value="all" className="flex-grow">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="breakfast" className="flex-grow">
                    Breakfast
                  </TabsTrigger>
                  <TabsTrigger value="lunch" className="flex-grow">
                    Lunch
                  </TabsTrigger>
                  <TabsTrigger value="dinner" className="flex-grow">
                    Dinner
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <div className="grid grid-cols-4 gap-4">
                    {restaurantItems.map((item) => (
                      <div className="my-2">
                        <MenuItem item={item} />
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="breakfast">Breakfast</TabsContent>
                <TabsContent value="lunch">Lunch</TabsContent>
                <TabsContent value="dinner">Dinner</TabsContent>
              </Tabs>
            </div>

            <div className="my-5">
              <PaginationComponent />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RestaurantItem;
