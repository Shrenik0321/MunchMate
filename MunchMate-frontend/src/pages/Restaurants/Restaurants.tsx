import Banner from "@/components/Banner/Banner";
import RestaurantStores from "@/components/RestaurantStores/RestaurantStores";

const Restaurants = () => {
  return (
    <div className="px-10 py-5">
      <Banner />

      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-5 overflow-y-auto">
          <RestaurantStores />
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
