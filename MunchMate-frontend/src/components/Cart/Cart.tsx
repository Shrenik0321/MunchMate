import { ShoppingCart, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const orderItems = [
    { itemName: "Pancakes", price: 7.99, quantity: 1 },
    { itemName: "Caesar Salad", price: 5.99, quantity: 2 },
    { itemName: "Spaghetti Carbonara", price: 7.99, quantity: 1 },
  ];

  const total = orderItems
    .reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <ShoppingCart />
          </Button>
        </SheetTrigger>

        <SheetContent>
          <div className="w-[350px] p-4">
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl">Your Order</h2>
                <p className="text-right text-xl font-bold">${total}</p>
              </div>
            </div>
            <div className="mb-4">
              {orderItems.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-2"
                >
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
            </div>
            <SheetFooter>
              <Button className="w-full bg-[#f97316] hover:bg-[#f97316]">
                Checkout
              </Button>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Cart;
