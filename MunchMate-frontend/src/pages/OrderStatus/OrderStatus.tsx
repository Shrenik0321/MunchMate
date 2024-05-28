import { Progress } from "@/components/ui/progress";
import React from "react";

const OrderStatus = () => {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="m-10">
      <div className="flex justify-between">
        <div>
          <p className="text-3xl font-bold">
            Order Status: Awaiting Restaurant Confirmation
          </p>
        </div>
        <div>
          <p className="text-3xl font-bold">Expected by : 15:12</p>
        </div>
      </div>

      <div className="my-10">
        <Progress value={progress} className="w-full" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="...">
          <p className="text-3xl font-bold">Delivery Details</p>
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
