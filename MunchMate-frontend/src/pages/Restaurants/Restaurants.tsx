import BreadCrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import PaginationComponent from "@/components/Pagination/Pagination";
import RestaurantFilters from "@/components/RestaurantFilters/RestaurantFilters";
import RestaurantStores from "@/components/RestaurantStores/RestaurantStores";

const Restaurants = () => {
  return (
    <div className="px-10 py-5">
      <div className="mb-4">
        <BreadCrumbs />
      </div>
      <div className="grid grid-cols-5 gap-4">
        <div>
          <RestaurantFilters />
        </div>
        <div className="col-span-4 overflow-y-auto">
          <RestaurantStores />
          <div>
            <PaginationComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
