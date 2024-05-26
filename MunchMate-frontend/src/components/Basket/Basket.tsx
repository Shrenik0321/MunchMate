import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Basket = () => {
  const orderItems = [
    { itemName: "Pancakes", price: 7.99, quantity: 1 },
    { itemName: "Caesar Salad", price: 5.99, quantity: 2 },
    { itemName: "Spaghetti Carbonara", price: 7.99, quantity: 1 },
  ];

  const total = orderItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">Your Order</CardTitle>
            <CardDescription className="text-right text-xl font-bold">
              ${total}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {orderItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <div>
                <p>{item.itemName}</p>
                <p className="text-sm text-gray-500">x{item.quantity}</p>
              </div>
              <div className="flex gap-2 items-center">
                <p>${(item.price * item.quantity).toFixed(2)}</p>
                <Trash2
                  size={18}
                  color={"#dc2626"}
                  className="cursor-pointer"
                />
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full bg-[#f97316] hover:bg-[#f97316]">
                Checkout
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Confirm Delivery Details</DialogTitle>
                <DialogDescription>
                  View and change your delivery information here.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    defaultValue="Shrenik Deep"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  className="bg-[#f97316] hover:bg-[#f97316]"
                  type="submit"
                >
                  Continue to payment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Basket;
