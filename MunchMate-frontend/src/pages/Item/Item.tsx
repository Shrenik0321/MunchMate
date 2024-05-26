import { useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Basket from "@/components/Basket/Basket";
import MenuItem from "@/components/MenuItem/MenuItem";

const Item = () => {
  const location = useLocation();
  const itemData = location.state?.data;

  const menuItems = [
    {
      itemName: "Pancakes",
      ingredients: [
        "Flour",
        "Milk",
        "Eggs",
        "Baking Powder",
        "Sugar",
        "Butter",
      ],
      price: 7.99,
      description: "Fluffy pancakes served with syrup and a side of butter.",
      imageUrl: "/src/assets/Rectangle 46 (2).png",
    },
    {
      itemName: "Caesar Salad",
      ingredients: [
        "Romaine Lettuce",
        "Croutons",
        "Parmesan Cheese",
        "Caesar Dressing",
      ],
      price: 9.99,
      description:
        "Crisp romaine lettuce tossed with creamy Caesar dressing, croutons, and grated Parmesan cheese.",
      imageUrl: "/src/assets/Rectangle 46 (2).png",
    },
    {
      itemName: "Spaghetti Carbonara",
      ingredients: [
        "Spaghetti",
        "Eggs",
        "Parmesan Cheese",
        "Pancetta",
        "Black Pepper",
      ],
      price: 12.99,
      description:
        "Classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
      imageUrl: "/src/assets/Rectangle 46 (2).png",
    },
    {
      itemName: "Grilled Chicken Sandwich",
      ingredients: ["Chicken Breast", "Lettuce", "Tomato", "Mayonnaise", "Bun"],
      price: 10.99,
      description:
        "Juicy grilled chicken breast served on a toasted bun with lettuce, tomato, and mayonnaise.",
      imageUrl: "/src/assets/Rectangle 46 (2).png",
    },
    {
      itemName: "Chocolate Cake",
      ingredients: [
        "Flour",
        "Cocoa Powder",
        "Sugar",
        "Eggs",
        "Butter",
        "Baking Soda",
        "Vanilla Extract",
      ],
      price: 6.99,
      description:
        "Rich and moist chocolate cake topped with creamy chocolate frosting.",
      imageUrl: "/src/assets/Rectangle 46 (2).png",
    },
  ];

  return (
    <div className="my-6 mx-12">
      <div className="grid grid-cols-2">
        <div className="col-span-1 size-10/12">
          <img
            src={itemData.imageUrl}
            alt="Item Image"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="col-span-1">
          <div className="flex flex-col">
            <div className="my-2">
              <p className="text-3xl font-semibold cursor-pointer">
                {itemData.name}
              </p>
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
            <div className="my-2">
              <p className="text-[#52525b]">{itemData.description}</p>
            </div>
            <div className="flex my-2">
              <div>
                <MapPin />
              </div>
              <p className="text-md">{itemData.address}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-2">
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
              {menuItems.map((item) => (
                <div className="my-2">
                  <MenuItem item={item} />
                </div>
              ))}
            </TabsContent>
            <TabsContent value="breakfast">Breakfast</TabsContent>
            <TabsContent value="lunch">Lunch</TabsContent>
            <TabsContent value="dinner">Dinner</TabsContent>
          </Tabs>
        </div>

        <div className="col-span-1">
          <Basket />
        </div>
      </div>
    </div>
  );
};

export default Item;
