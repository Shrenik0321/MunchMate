import React from "react";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import MenuItem from "@/components/MenuItem/MenuItem";
import BreadCrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import PaginationComponent from "@/components/Pagination/Pagination";
import { getRestaurantWithAllRestaurantItems } from "@/api/getRestaurantWithAllRestaurantItems";
import Loader from "@/components/Loader/Loader";
import ReviewCarousel from "@/components/ReviewCarousel/ReviewCarousel";
import SearchBar from "@/components/SearchBar/SearchBar";

const RestaurantItem = () => {
  const [restaurantWithRestaurantItems, setRestaurantWithRestaurantItems] =
    React.useState<any>(null);
  const [restaurantItems, setRestaurantItems] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(false);
  const [activePage, setActivePage] = React.useState(1);
  const [totalItemCount, setTotalItemCount] = React.useState(0);
  const [itemSearch, setItemSearch] = React.useState("");
  const itemsPerPage: number = 8;
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const getId = () => {
    const urlObject = new URL(window.location.href);
    const pathSegments = urlObject.pathname.split("/");
    const id = pathSegments[pathSegments.length - 1];
    return id;
  };

  const getRestaurantWithRestaurantItems = async (page = 1) => {
    setLoading(true);
    try {
      const response = await getRestaurantWithAllRestaurantItems({
        id: getId(),
        page,
      });

      if (response) {
        setRestaurantWithRestaurantItems(response);

        const { items } = response;
        setRestaurantItems(items.slice(startIndex, endIndex));
        setTotalItemCount(items.length);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getRestaurantWithRestaurantItems(activePage);
  }, [activePage]);

  // React.useEffect(() => {
  //   const getRestaurantItemsBySearch = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await getRestaurantWithAllRestaurantItems({
  //         id: getId(),
  //         name: itemSearch,
  //       });
  //       const { items } = response;
  //       if (items) {
  //         setRestaurantItems(items);
  //         setTotalItemCount(items.length);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (itemSearch != "") {
  //     getRestaurantItemsBySearch();
  //   } else {
  //     getRestaurantWithRestaurantItems();
  //   }
  // }, [itemSearch]);

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setActivePage(page);
  };

  return (
    <div className="my-6 mx-12">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="my-5">
            <BreadCrumbs />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="h-72">
              <img
                src={restaurantWithRestaurantItems?.imageUrl}
                alt="RestaurantItem Image"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-bold cursor-pointer">
                {restaurantWithRestaurantItems?.name}
              </h1>
              <div className="flex flex-wrap gap-2">
                {restaurantWithRestaurantItems?.tags.map(
                  (tagItem: any, index: number) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-gray-500"
                    >
                      {tagItem}
                    </Badge>
                  )
                )}
              </div>
              <div className="flex items-center gap-2">
                <MapPin />
                <p className="text-md">
                  {restaurantWithRestaurantItems?.address}
                </p>
              </div>
              <p className="text-[#52525b]">
                {restaurantWithRestaurantItems?.description}
              </p>

              <ReviewCarousel />
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 mb-1 flex justify-between text-center items-center">
        <div>
          <p className="text-2xl font-bold text-[#03081F] font-sans">
            All Restaurant Items.
          </p>
        </div>

        <div className="mr-2">
          <SearchBar setItemSearch={setItemSearch} />
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="grid md:grid-cols-4 gap-4 my-8">
            {restaurantItems.length > 0 &&
              restaurantItems.map((item: any, index: number) => (
                <div key={index}>
                  <MenuItem item={item} />
                </div>
              ))}
          </div>

          <div className="my-5">
            <PaginationComponent
              activePage={activePage}
              itemsPerPage={itemsPerPage}
              totalItemCount={totalItemCount}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default RestaurantItem;
