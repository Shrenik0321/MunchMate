import React from "react";
import { useNavigate } from "react-router-dom";
import { getAllRestaurantItems } from "@/api/getAllRestaurantItems";
import Loader from "@/components/Loader/Loader";
import { Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }: any) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            item.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const AllRestaurantItems = () => {
  const [restaurantItems, setRestaurantItems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState(null);
  const navigate = useNavigate();
  const tableHeaders = ["Name", "Price", "Description", "Actions"];

  const getId = () => {
    const urlObject = new URL(window.location.href);
    const pathSegments = urlObject.pathname.split("/");
    const id = pathSegments[pathSegments.length - 1];
    return id;
  };

  React.useEffect(() => {
    const getRestaurantItems = async () => {
      setLoading(true);
      try {
        const response = await getAllRestaurantItems({
          restaurantId: getId(),
        });
        const { data } = response;
        if (data) {
          setRestaurantItems(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getRestaurantItems();
  }, []);

  const handleDeleteClick = (restaurantItem: any) => {
    setItemToDelete(restaurantItem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  const handleConfirmDelete = () => {
    // Handle the delete action here
    console.log("Deleting item:", itemToDelete);
    // Close the modal after deletion
    setIsModalOpen(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex justify-between items-center py-6 px-4 md:px-6 xl:px-7.5">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              All Restaurant Menu Items
            </h4>
            <Button
              className="flex items-center space-x-2"
              onClick={() =>
                navigate(`/admin/restaurant/${getId()}/add-restaurant-item`)
              }
            >
              <Plus className="w-5 h-5" />
              <span>Add Item</span>
            </Button>
          </div>

          {restaurantItems.length === 0 ? (
            <div className="py-10 text-center text-gray-500 dark:text-gray-400">
              No Restaurant Menu Items found.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-10 border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5">
                {tableHeaders.map((header, index) => (
                  <div
                    className={`col-span-${
                      index === 1 ? 2 : index === 2 ? 4 : index === 3 ? 1 : 3
                    } flex items-center`}
                    key={header}
                  >
                    <p className="font-medium">{header}</p>
                  </div>
                ))}
              </div>
              {restaurantItems.map((restaurantItem: any, key: number) => (
                <div
                  className="grid grid-cols-10 border-t border-stroke py-3 dark:border-strokedark md:px-6 2xl:px-7.5 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-200"
                  key={key}
                  onClick={() =>
                    navigate(`/admin/restaurant-item/${restaurantItem._id}`, {
                      state: { restaurantItem },
                    })
                  }
                >
                  <div
                    className="col-span-3 flex items-center"
                    onClick={() =>
                      navigate(`/admin/restaurant/item/${restaurantItem._id}`, {
                        state: { restaurant: restaurantItem },
                      })
                    }
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="rounded-md w-24 h-24 overflow-hidden">
                        <img
                          src={restaurantItem.imageUrl}
                          alt="Product"
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <p className="text-sm text-black dark:text-white">
                        {restaurantItem.name}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-2 flex items-center">
                    <p className="text-sm text-black dark:text-white">
                      {restaurantItem.price}
                    </p>
                  </div>

                  <div className="col-span-4 flex items-center">
                    <p className="text-sm text-black dark:text-white">
                      {restaurantItem.description}
                    </p>
                  </div>

                  <div className="col-span-1 flex items-center space-x-2 m-auto">
                    <Trash
                      className="w-5 h-5 text-red-500 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(restaurantItem);
                      }}
                    />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default AllRestaurantItems;
