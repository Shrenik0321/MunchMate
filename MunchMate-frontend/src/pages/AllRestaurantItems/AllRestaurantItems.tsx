import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const location = useLocation();
  const { restaurant } = location.state || {};

  const tableHeaders = [
    "Name",
    "Price",
    "Description",
    "Ingredients",
    "Actions",
  ];

  React.useEffect(() => {
    const getRestaurantItems = async () => {
      setLoading(true);
      try {
        const response = await getAllRestaurantItems({
          restaurantId: restaurant._id,
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
  }, [restaurant._id]);

  const handleDeleteClick = (item: any) => {
    setItemToDelete(item);
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
              {`All ${restaurant.name} Items`}
            </h4>
            <Button
              className="flex items-center space-x-2"
              onClick={() =>
                navigate(
                  `/admin/restaurant/${restaurant._id}/add-restaurant-item`
                )
              }
            >
              <Plus className="w-5 h-5" />
              <span>Add Item</span>
            </Button>
          </div>
          <div className="grid grid-cols-12 border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5">
            {tableHeaders.map((header, index) => (
              <div
                className={`col-span-${
                  index === 1
                    ? 1
                    : index === 2
                    ? 3
                    : index === 3
                    ? 4
                    : index === 4
                    ? 1
                    : 3
                } flex items-center`}
                key={header}
              >
                <p className="font-medium">{header}</p>
              </div>
            ))}
          </div>
          {restaurantItems.map((item: any, key: number) => (
            <div
              className="grid grid-cols-12 border-t border-stroke py-3 dark:border-strokedark md:px-6 2xl:px-7.5 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-200"
              key={key}
            >
              <div
                className="col-span-3 flex items-center"
                onClick={() =>
                  navigate(`/admin/restaurant/item/${item._id}`, {
                    state: { restaurant: item },
                  })
                }
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="rounded-md w-24 h-24 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt="Product"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-sm text-black dark:text-white">
                    {item.name}
                  </p>
                </div>
              </div>

              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {item.price}
                </p>
              </div>

              <div className="col-span-3 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {item.description}
                </p>
              </div>

              <div className="col-span-4 flex items-center">
                <Select>
                  <SelectTrigger className="w-[75%] mx-2">
                    <SelectValue placeholder="Ingredients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Ingredients</SelectLabel>
                      {item.ingredients &&
                        item.ingredients.map(
                          (ingredient: string, index: number) => (
                            <SelectItem key={index} value={ingredient}>
                              <span>{ingredient}</span>
                            </SelectItem>
                          )
                        )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-1 flex items-center space-x-2">
                <Trash
                  className="w-5 h-5 text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(item);
                  }}
                />
              </div>
            </div>
          ))}
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
