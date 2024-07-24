import Banner from "@/components/Banner/Banner";
import RestaurantStores from "@/components/RestaurantStores/RestaurantStores";

const Restaurants = () => {
  return (
    <div className="px-10 py-5">
      <Banner />

      <div>
        <div className="mt-8 mb-1">
          <p className="text-2xl font-bold text-[#03081F] font-sans">
            All Restaurants.
          </p>
        </div>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-5 overflow-y-auto">
            <RestaurantStores />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
