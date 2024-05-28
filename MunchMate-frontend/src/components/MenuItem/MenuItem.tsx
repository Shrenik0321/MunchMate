import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dot } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus } from "lucide-react";

const MenuItem = ({ item }: any) => {
  return (
    <div>
      <Card className="w-full max-h-48 relative overflow-hidden">
        <div className="flex h-full">
          <div className="w-1/3 h-full">
            <img
              src={item.imageUrl}
              alt="Food Image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-2/3 p-4 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <CardHeader className="w-full p-0">
                <CardTitle>
                  <div className="flex justify-between my-2">
                    <div className="text-xl">{item.itemName}</div>
                    <div className="text-lg">{`$ ${item.price}`}</div>
                  </div>
                </CardTitle>
              </CardHeader>
            </div>
            <CardContent className="p-0 mt-2 flex-grow">
              <CardDescription>{item.description}</CardDescription>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {item.ingredients.map((ingredient: any, index: number) => (
                  <div key={index} className="flex items-center">
                    <CardDescription>{ingredient}</CardDescription>
                    {index < item.ingredients.length - 1 && (
                      <Dot className="mx-1" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </div>
        </div>
        <div className="absolute bottom-4 right-4">
          <Avatar>
            <AvatarFallback>
              <Plus />
            </AvatarFallback>
          </Avatar>
        </div>
      </Card>
    </div>
  );
};

export default MenuItem;
