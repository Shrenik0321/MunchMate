import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AlignJustify, LogOut } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { userSignOut } from "@/api/userSignOut";
import { handleToastError, handleToastSuccess } from "@/utils/toast";

const SideBar = () => {
  const { auth, setAuth } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await userSignOut();
      setAuth(null);
      handleToastSuccess(response.message);
    } catch (err) {
      console.log(err);
      handleToastError("Something went wrong");
    }
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <AlignJustify />
          </Button>
        </SheetTrigger>

        <SheetContent side={"left"}>
          {auth ? (
            <div className="my-5">
              <SheetHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/path/to/avatar.jpg" alt="User Avatar" />
                    <AvatarFallback>{auth.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <SheetTitle>{auth.name}</SheetTitle>
                    <p
                      className="text-sm text-orange-500 cursor-pointer"
                      onClick={() => navigate("/admin/overview")}
                    >
                      Manage your account.
                    </p>
                  </div>
                </div>
              </SheetHeader>
            </div>
          ) : (
            <div className="my-5">
              <SheetHeader>
                <Button
                  className="w-full bg-[#f97316] hover:bg-[#f97316]"
                  onClick={() => {
                    navigate("/sign-in");
                  }}
                >
                  Sign In
                </Button>
              </SheetHeader>
            </div>
          )}

          <Accordion type="single" collapsible className="w-full my-5">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I place an order?</AccordionTrigger>
              <AccordionContent>
                To place an order, browse through the menu, add items to your
                cart, and proceed to checkout. You can sign in or create an
                account to complete your order.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                What payment methods are accepted?
              </AccordionTrigger>
              <AccordionContent>
                We accept various payment methods including credit/debit cards,
                PayPal, and other popular digital wallets.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How can I track my order?</AccordionTrigger>
              <AccordionContent>
                After placing your order, you can track its status in real-time
                through our app or website. You will also receive notifications
                about the delivery status.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                What should I do if I have an issue with my order?
              </AccordionTrigger>
              <AccordionContent>
                If you encounter any issues with your order, please contact our
                customer support team via the app or website. We're here to help
                you resolve any problems quickly.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>
                Can I schedule an order for a later time?
              </AccordionTrigger>
              <AccordionContent>
                Yes, you can schedule orders for a later time during checkout.
                Simply select your preferred delivery time before finalizing
                your order.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div>
            <p
              className="text-sm text-gray-500 cursor-pointer"
              onClick={() => navigate("/admin/overview")}
            >
              Add and manage your restaurant.
            </p>
          </div>

          {auth && (
            <div className="mt-auto flex flex-col items-start space-y-2">
              <div className="flex items-center space-x-2">
                <LogOut
                  className="cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={handleLogout}
                />
                <p
                  className="text-sm text-gray-500 cursor-pointer"
                  onClick={handleLogout}
                >
                  Sign Out
                </p>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SideBar;
