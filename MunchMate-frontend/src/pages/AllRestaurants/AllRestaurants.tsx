import React from "react";
import { useNavigate } from "react-router-dom";
import { getAllRestaurants } from "@/api/getAllRestaurants";
import Loader from "@/components/Loader/Loader";
import { Trash } from "lucide-react";

const AllRestaurants = () => {
  const [restaurants, setRestaurants] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const tableHeaders = [
    "Name",
    "Email",
    "Contact Number",
    "Address",
    "Actions",
  ];

  React.useEffect(() => {
    const getRestaurants = async () => {
      setLoading(true);
      try {
        const response = await getAllRestaurants();
        const { data } = response;
        if (data) {
          setRestaurants(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getRestaurants();
  }, []);

  const handleDelete = (restaurantId: string) => {
    // Add your delete logic here
    console.log(`Delete restaurant with ID: ${restaurantId}`);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="py-6 px-4 md:px-6 xl:px-7.5">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              All Restaurants
            </h4>
          </div>
          <div className="grid grid-cols-12 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-12 md:px-6 2xl:px-7.5">
            {tableHeaders.map((header, index) => (
              <div
                className={`col-span-${
                  index === 4 ? 1 : index === 2 ? 2 : 3
                } flex items-center`}
                key={header}
              >
                <p className="font-medium">{header}</p>
              </div>
            ))}
          </div>
          {restaurants.map((restaurant: any, key: number) => (
            <div
              className="grid grid-cols-12 border-t border-stroke py-3 dark:border-strokedark sm:grid-cols-12 md:px-6 2xl:px-7.5 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-200"
              key={key}
              onClick={() =>
                navigate(`/admin/restaurant/${restaurant._id}`, {
                  state: { restaurant },
                })
              }
            >
              <div className="col-span-3 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="rounded-md w-24 h-24 overflow-hidden">
                    <img
                      src={restaurant.imageUrl}
                      alt="Restaurant"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-sm text-black dark:text-white">
                    {restaurant.name}
                  </p>
                </div>
              </div>
              <div className="col-span-3 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {restaurant.email}
                </p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {restaurant.contactNumber}
                </p>
              </div>
              <div className="col-span-3 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {restaurant.address}
                </p>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <Trash
                  className="w-5 h-5 text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(restaurant._id);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AllRestaurants;
