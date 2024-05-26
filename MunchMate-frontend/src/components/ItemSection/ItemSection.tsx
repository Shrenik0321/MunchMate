import SearchBar from "../SearchBar/SearchBar";
import { Badge } from "@/components/ui/badge";
import { Hourglass } from "lucide-react";
import { Banknote } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Items = () => {
  const navigate = useNavigate();

  const items = [
    {
      id: 1,
      name: "Grand Ai Cafe",
      tags: ["Noodles", "Cafe", "Pasta", "Chinese"],
      time: "26",
      deliveryFrom: "100",
      imageUrl: "/src/assets/Group 11.png",
      description:
        "A cozy cafe offering a variety of Chinese and Italian dishes.",
      address: "123 Main Street, Cityville, Country",
    },
    {
      id: 2,
      name: "The Indian Kitchen",
      tags: ["Biriyani", "Paratta", "Tika Masala", "Indian"],
      time: "26",
      deliveryFrom: "100",
      imageUrl: "/src/assets/Group 8.png",
      description: "Authentic Indian cuisine with a modern twist.",
      address: "456 Spice Avenue, Cityville, Country",
    },
    {
      id: 3,
      name: "StarBucks",
      tags: ["Burger", "Cafe", "Healthy", "American"],
      time: "26",
      deliveryFrom: "100",
      imageUrl: "/src/assets/Group 11.png",
      description:
        "Popular American cafe chain known for its burgers and healthy options.",
      address: "789 Coffee Lane, Cityville, Country",
    },
  ];

  return (
    <div>
      <SearchBar />
      <div className="grid gap-4">
        {items.map((item) => (
          <div className="w-full my-4">
            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-2">
                <img
                  src={item.imageUrl}
                  alt="PDF Image"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="col-span-3 flex flex-col">
                <div>
                  <p
                    className="text-3xl font-semibold hover:text-[#f97316] cursor-pointer"
                    onClick={() =>
                      navigate(`/item/${item.id}`, { state: { data: item } })
                    }
                  >
                    {item.name}
                  </p>
                </div>
                <div className="flex gap-2 my-3">
                  {item.tags.map((tagItem, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-gray-500"
                    >
                      {tagItem}
                    </Badge>
                  ))}
                </div>
                <div>
                  <p className="text-[#52525b]">{item.description}</p>
                </div>
              </div>
              <div className="col-span-1 flex flex-col justify-center">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center">
                    <Hourglass size="20" color="#16a34a" />
                    <p className="text-md text-[#16a34a] mx-2">{`${item.time} minutes`}</p>
                  </div>
                  <div className="flex items-center">
                    <Banknote size="20" />
                    <p className="text-md mx-2">{`${item.deliveryFrom} LKR`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
