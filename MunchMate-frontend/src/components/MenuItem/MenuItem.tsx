import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dot } from "lucide-react";

const MenuItem = ({ item }: any) => {
  return (
    <div>
      <Card className="w-full">
        <div className="flex">
          <div className="w-1/5">
            <img
              src={item.imageUrl}
              alt="Food Image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-4/5 p-4">
            <div className="flex justify-between items-start">
              <CardHeader className="w-full p-0">
                <CardTitle>{item.itemName}</CardTitle>
                <CardDescription className="text-right">
                  ${item.price}
                </CardDescription>
              </CardHeader>
            </div>
            <CardContent className="p-0 mt-2">
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
      </Card>
    </div>
  );
};

export default MenuItem;
