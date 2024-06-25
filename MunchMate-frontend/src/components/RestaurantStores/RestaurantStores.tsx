import React from "react";
import RestaurantItemCard from "../RestaurantItemCard/RestaurantItemCard";
import { getAllRestaurants } from "@/api/getAllRestaurants";
import PaginationComponent from "../Pagination/Pagination";
import Loader from "../Loader/Loader";

const RestaurantStores = () => {
  const [restaurants, setRestaurants] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

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

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-3 gap-5">
          {restaurants.map((item, index) => (
            <RestaurantItemCard item={item} key={index} />
          ))}
        </div>
      )}

      <div>
        <PaginationComponent />
      </div>
    </div>
  );
};

export default RestaurantStores;
