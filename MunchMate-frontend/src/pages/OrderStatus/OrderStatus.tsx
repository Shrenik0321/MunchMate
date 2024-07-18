import { Progress } from "@/components/ui/progress";
import React from "react";
import Cookies from "js-cookie";
import { useOrderStatusContext } from "@/hooks/useOrderStatusContext";

const OrderStatus = () => {
  const { orderStatus, setOrderStatus } = useOrderStatusContext();
  const [confirmedData, setConfirmedData] = React.useState<any>(undefined);
  const [progress, setProgress] = React.useState(0);
  const [progressDescription, setProgressDescription] = React.useState("");

  React.useEffect(() => {
    const cookieData = Cookies.get("confirmedOrder");
    if (cookieData) {
      setConfirmedData(JSON.parse(cookieData));
    }

    const handleStorageChange = (event: any) => {
      if (event.key === "orderStatus") {
        setOrderStatus(event.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  React.useEffect(() => {
    switch (orderStatus) {
      case "Placed":
        setProgress(25);
        setProgressDescription("Awaiting restaurant confirmation");
        break;
      case "In Progress":
        setProgress(50);
        setProgressDescription("Your order is being prepared");
        break;
      case "Delivered":
        setProgress(100);
        setProgressDescription("Order delivered. Enjoy your meal!");
        break;
      default:
        setProgress(25);
        setProgressDescription("Awaiting restaurant confirmation");
    }
  }, [orderStatus]);

  return (
    <div className="m-10">
      <div className="flex justify-between">
        <div>
          <p className="text-3xl font-bold">
            Order Status:
            <span className="px-2 text-orange-500">{progressDescription}</span>
          </p>
        </div>
        <div>
          <p className="text-3xl font-bold">Expected by: 15:12</p>
        </div>
      </div>

      <div className="my-10">
        <Progress value={progress} className="w-full" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-3xl font-bold">Delivery Details</p>
          <div className="mt-4">
            <p className="text-xl font-semibold">Delivering To:</p>
            <p>{confirmedData?.customerName}</p>
            <p>{confirmedData?.contactNumber}</p>
            <p>{confirmedData?.address}</p>
          </div>

          <div className="mt-4">
            <p className="text-xl font-semibold">Order:</p>
            {confirmedData &&
              confirmedData?.orderedItems.map((data: any) => (
                <div className="flex justify-between">
                  <p>{data.itemName}</p>
                  <p>{data.quantity}</p>
                </div>
              ))}
          </div>

          <div className="mt-4">
            <p className="text-xl font-semibold">Total Cost:</p>
            <p>{confirmedData?.totalCost}</p>
          </div>
        </div>

        <div>
          <div className="size-10/12">
            <img
              src="/src/assets/Group 8.png"
              alt="PDF Image"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
