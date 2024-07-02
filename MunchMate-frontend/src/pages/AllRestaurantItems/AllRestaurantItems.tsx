import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllRestaurantItems } from "@/api/getAllRestaurantItems";
import Loader from "@/components/Loader/Loader";
import { Plus, Edit, Trash, Save, X } from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

const AddNewItemModal = ({
  isAddItemOpen,
  onAddItemClose,
  onAddItemConfirm,
}: any) => {
  return (
    <Dialog open={isAddItemOpen} onOpenChange={onAddItemClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onAddItemConfirm}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const AllRestaurantItems = () => {
  const [restaurantItems, setRestaurantItems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [editingRowId, setEditingRowId] = React.useState<string | null>(null);
  const [editedItem, setEditedItem] = React.useState<any>({});
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalAddItemOpen, setIsModalAddItemOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { restaurant } = location.state || {};

  const tableHeaders = ["Name", "Price", "Description", "Actions"];

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

  const handleEditClick = (item: any) => {
    setEditingRowId(item._id);
    setEditedItem(item);
  };

  const handleSaveClick = () => {
    // Handle save logic here
    setEditingRowId(null);
  };

  const handleCancelClick = () => {
    setEditingRowId(null);
    setEditedItem({});
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setEditedItem({ ...editedItem, [field]: e.target.value });
  };

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

  const handleAddItemClick = () => {
    setIsModalAddItemOpen(true);
  };

  const handleCloseAddItemModal = () => {
    setIsModalAddItemOpen(false);
  };

  const handleConfirmAddItem = () => {
    // Handle the delete action here
    console.log("Adding item:");
    // Close the modal after deletion
    setIsModalAddItemOpen(false);
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
              onClick={(e) => {
                e.stopPropagation();
                handleAddItemClick();
              }}
            >
              <Plus className="w-5 h-5" />
              <span>Add Item</span>
            </Button>
          </div>
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
          {restaurantItems.map((item: any, key: number) => (
            <div
              className="grid grid-cols-10 border-t border-stroke py-3 dark:border-strokedark md:px-6 2xl:px-7.5 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-200"
              key={key}
            >
              {editingRowId === item._id ? (
                <>
                  <div className="col-span-3 flex items-center">
                    <input
                      type="text"
                      value={editedItem.name}
                      onChange={(e) => handleInputChange(e, "name")}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="col-span-2 flex items-center">
                    <input
                      type="text"
                      value={editedItem.price}
                      onChange={(e) => handleInputChange(e, "price")}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="col-span-4 flex items-center">
                    <input
                      type="text"
                      value={editedItem.description}
                      onChange={(e) => handleInputChange(e, "description")}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="col-span-1 flex items-center space-x-2">
                    <Save
                      className="w-5 h-5 text-green-500 cursor-pointer"
                      onClick={handleSaveClick}
                    />
                    <X
                      className="w-5 h-5 text-red-500 cursor-pointer"
                      onClick={handleCancelClick}
                    />
                  </div>
                </>
              ) : (
                <>
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
                  <div className="col-span-2 flex items-center">
                    <p className="text-sm text-black dark:text-white">
                      {item.price}
                    </p>
                  </div>
                  <div className="col-span-4 flex items-center">
                    <p className="text-sm text-black dark:text-white">
                      {item.description}
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center space-x-2">
                    <Edit
                      className="w-5 h-5 text-blue-500 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(item);
                      }}
                    />
                    <Trash
                      className="w-5 h-5 text-red-500 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(item);
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
      <AddNewItemModal
        isAddItemOpen={isModalAddItemOpen}
        onAddItemClose={handleCloseAddItemModal}
        onAddItemConfirm={handleConfirmAddItem}
      />
    </>
  );
};

export default AllRestaurantItems;
