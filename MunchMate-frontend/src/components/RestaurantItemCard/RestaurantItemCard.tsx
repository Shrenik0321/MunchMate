import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RestaurantItemCard = ({ item }: any) => {
  const navigate = useNavigate();
  return (
    <Card key={item.id} className="w-full my-4">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-36 object-cover rounded-md"
      />
      <div className="p-3">
        <CardHeader className="px-0 py-2 flex flex-row justify-between items-center">
          <CardTitle
            className="text-xl cursor-pointer hover:text-[#f97316]"
            onClick={() =>
              navigate(`/restaurant/${item.id}`, { state: { data: item } })
            }
          >
            {item.name}
          </CardTitle>
          <div className="flex items-center text-yellow-500">
            <Star className="w-4 h-4 mt-0" />
            <span className="ml-1 text-sm">{item.rating}</span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <CardDescription>{item.description}</CardDescription>
        </CardContent>
      </div>
    </Card>
  );
};

export default RestaurantItemCard;
