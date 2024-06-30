import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCartContext } from "@/hooks/useCartContext";
import { handleToastSuccess } from "@/utils/toast";

const MenuItem = ({ item }: any) => {
  const { cart, setCart } = useCartContext();

  const handleAddItemToCart = () => {
    let tempCart = [...cart, item];
    setCart(tempCart);
    handleToastSuccess("Successfully added to cart!");
  };

  return (
    <div>
      <Card className="w-full max-h-80 relative overflow-hidden">
        <img
          src={item.imageUrl}
          alt="Food Image"
          className="w-full h-32 object-cover"
        />
        <div className="p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <CardHeader className="w-full p-0">
              <CardTitle>
                <div className="flex justify-between my-2">
                  <div className="text-xl">{item.name}</div>
                  <div className="text-lg">{`$ ${item.price}`}</div>
                </div>
              </CardTitle>
            </CardHeader>
          </div>
          <CardContent className="p-0 mt-2 flex-grow">
            <TooltipProvider>
              <Tooltip>
                <CardDescription className="truncate">
                  <TooltipTrigger>{item.description}</TooltipTrigger>
                </CardDescription>

                <TooltipContent>{item.description}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardContent>
        </div>
        <div className="absolute top-2 right-2">
          <Avatar
            className="bg-gray-100 hover:bg-gray-400 transform transition-transform duration-300 hover:scale-110 cursor-pointer"
            onClick={handleAddItemToCart}
          >
            <AvatarFallback className="flex items-center justify-center w-full h-full">
              <Plus />
            </AvatarFallback>
          </Avatar>
        </div>
      </Card>
    </div>
  );
};

export default MenuItem;
