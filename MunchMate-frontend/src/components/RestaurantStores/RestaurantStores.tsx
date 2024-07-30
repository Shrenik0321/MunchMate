import React from "react";
import RestaurantItemCard from "../RestaurantItemCard/RestaurantItemCard";
import { getAllRestaurants } from "@/api/getAllRestaurants";
import PaginationComponent from "../Pagination/Pagination";
import Loader from "../Loader/Loader";
import SearchBar from "@/components/SearchBar/SearchBar";

const RestaurantStores = () => {
  const [restaurants, setRestaurants] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(false);
  const [activePage, setActivePage] = React.useState(1);
  const [totalItemCount, setTotalItemCount] = React.useState(0);
  const [itemSearch, setItemSearch] = React.useState<any>("");

  const itemsPerPage: number = 10;
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

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

  React.useEffect(() => {
    getRestaurants(activePage);
  }, [activePage]);

  React.useEffect(() => {
    const getRestaurantsBySearch = async () => {
      setLoading(true);
      try {
        const response = await getAllRestaurants({ name: itemSearch });
        const { data } = response;
        if (data) {
          let dataArray = [data];
          setRestaurants(dataArray);
          setTotalItemCount(data.length);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (itemSearch != "") {
      getRestaurantsBySearch();
    } else {
      getRestaurants();
    }
  }, [itemSearch]);

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setActivePage(page);
  };

  return (
    <div>
      <div className="mt-8 mb-1 flex justify-between text-center items-center">
        <div>
          <p className="text-2xl font-bold text-[#03081F] font-sans">
            All Restaurants.
          </p>
        </div>

        <div className="mr-2">
          <SearchBar setItemSearch={setItemSearch} />
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="grid grid-cols-4 gap-5">
            {restaurants.map((item: any, index: number) => (
              <RestaurantItemCard item={item} key={index} />
            ))}
          </div>

          <PaginationComponent
            activePage={activePage}
            itemsPerPage={itemsPerPage}
            totalItemCount={totalItemCount}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default RestaurantStores;
