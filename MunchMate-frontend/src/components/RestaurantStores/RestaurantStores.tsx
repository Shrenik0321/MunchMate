import React from "react";
import RestaurantItemCard from "../RestaurantItemCard/RestaurantItemCard";
import { getAllRestaurants } from "@/api/getAllRestaurants";
import PaginationComponent from "../Pagination/Pagination";
import Loader from "../Loader/Loader";

const RestaurantStores = () => {
  const [restaurants, setRestaurants] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [activePage, setActivePage] = React.useState(1);
  const [totalItemCount, setTotalItemCount] = React.useState(0);

  const itemsPerPage: number = 10;
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  React.useEffect(() => {
    const getRestaurants = async (page = 1) => {
      setLoading(true);
      try {
        const response = await getAllRestaurants({ page });
        const { data } = response;
        if (data) {
          setRestaurants(data.slice(startIndex, endIndex));
          setTotalItemCount(data.length);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getRestaurants(activePage);
  }, [activePage]);

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setActivePage(page);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-4 gap-5">
            {restaurants.map((item, index) => (
              <RestaurantItemCard item={item} key={index} />
            ))}
          </div>
          <PaginationComponent
            activePage={activePage}
            itemsPerPage={itemsPerPage}
            totalItemCount={totalItemCount}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default RestaurantStores;
