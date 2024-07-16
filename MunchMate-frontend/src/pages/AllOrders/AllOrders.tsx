import React from "react";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader/Loader";
import { Trash, ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { getAllOrders } from "@/api/getAllOrders";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const AllOrders = () => {
  const [orders, setOrders] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const getRestaurants = async () => {
      setLoading(true);
      try {
        const response = await getAllOrders({});
        const { data } = response;
        if (data) {
          setOrders(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getRestaurants();
  }, []);

  const tableHeaders = [
    "Customer",
    "Ordered Items",
    "Price",
    "Contact Number",
    "Address",
    "Actions",
  ];

  const handleDelete = (restaurantId: string) => {
    // Add your delete logic here
    console.log(`Delete restaurant with ID: ${restaurantId}`);
  };

  const statusOptions = [
    { label: "Placed", color: "bg-yellow-200" },
    { label: "In Progress", color: "bg-blue-200" },
    { label: "Delivered", color: "bg-green-200" },
    { label: "Rejected", color: "bg-red-200" },
  ];

  const getStatusColor = (status: string) => {
    const statusOption = statusOptions.find(
      (option) => option.label === status
    );
    return statusOption ? statusOption.color : "bg-gray-200";
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="py-6 px-4 md:px-6 xl:px-7.5">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              All Orders
            </h4>
          </div>
          <div className="grid grid-cols-12 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-12 md:px-6 2xl:px-7.5">
            {tableHeaders.map((header, index) => (
              <div
                className={`col-span-${
                  index === 1
                    ? 2
                    : index === 2
                    ? 1
                    : index === 3
                    ? 2
                    : index === 4
                    ? 3
                    : index === 5
                    ? 1
                    : 3
                } flex items-center`}
                key={header}
              >
                <p className="font-medium">{header}</p>
              </div>
            ))}
          </div>

          {orders.length === 0 ? (
            <div className="py-10 text-center text-gray-500 dark:text-gray-400">
              No orders available.
            </div>
          ) : (
            <>
              {orders.map((order: any, key: number) => (
                <div
                  className="grid grid-cols-12 border-t border-stroke py-3 dark:border-strokedark sm:grid-cols-12 md:px-6 2xl:px-7.5 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-200"
                  key={key}
                  onClick={() =>
                    navigate(`/admin/order/${order._id}`, {
                      state: { order },
                    })
                  }
                >
                  <div className="col-span-3 flex items-center">
                    <div className="flex flex-col gap-2">
                      <p className="text-sm text-black dark:text-white">
                        {order?.userId.name}
                      </p>
                      <div className="col-span-2 flex items-center">
                        <Badge
                          variant="outline"
                          className={`text-xs ${getStatusColor(order.status)}`}
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 flex items-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className="cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="secondary"
                          className="text-xs bg-[#e5e7eb]"
                        >
                          View Items
                          <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {order?.orderedItems.map((item: any, index: number) => (
                          <DropdownMenuItem
                            key={index}
                            className="flex justify-between gap-10"
                          >
                            <span>{item?.restaurantItemId?.name}</span>
                            <span>x{item?.quantity}</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="col-span-1 flex items-center">
                    <p className="text-sm text-black dark:text-white">$12.43</p>
                  </div>

                  <div className="col-span-2 flex items-center">
                    <p className="text-sm text-black dark:text-white">
                      {order.contactNumber}
                    </p>
                  </div>

                  <div className="col-span-3 flex items-center">
                    <p className="text-sm text-black dark:text-white">
                      {order.address}
                    </p>
                  </div>

                  <div className="col-span-1 flex items-center justify-center ">
                    <Trash
                      className="w-5 h-5 text-red-500 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(order._id);
                      }}
                    />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AllOrders;
