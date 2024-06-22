import React from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/hooks/useAuthContext";

const Cart = () => {
  const [cartCount, setCartCount] = React.useState(3);
  const navigate = useNavigate();
  const { auth } = useAuthContext();
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
          <div className="relative hover:cursor-pointer">
            <ShoppingCart />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </div>
        </SheetTrigger>

        <SheetContent>
          {auth ? (
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
                <Button
                  className="w-full bg-[#f97316] hover:bg-[#f97316]"
                  onClick={() => navigate("/checkout")}
                >
                  Go to checkout
                </Button>
              </SheetFooter>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <img src={"/src/assets/ghost (2).png"} />
              <p className="mt-4 text-[#6b7280]">
                To view cart items, user should login or register
              </p>
              <div className="flex gap-2 my-3">
                <div>
                  <Button
                    className="bg-orange-500"
                    onClick={() => {
                      navigate("/sign-in");
                    }}
                  >
                    Login
                  </Button>
                </div>

                <div>
                  <Button
                    className="bg-orange-500"
                    onClick={() => {
                      navigate("/sign-up");
                    }}
                  >
                    Register
                  </Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Cart;
