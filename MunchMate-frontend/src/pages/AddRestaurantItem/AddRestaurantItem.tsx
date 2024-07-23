import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UploadDropzone from "../../components/UploadDropzone/UploadDropzone";
import { addRestaurantItem } from "@/api/addRestaurantItem";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loader from "@/components/Loader/Loader";
import { handleToastError, handleToastSuccess } from "@/utils/toast";
import { useNavigate } from "react-router-dom";

function getRestaurantIdFromUrl() {
  const url = window.location.href;
  const regex = /\/restaurant\/([a-f\d]{24})\//;
  const match = url.match(regex);
  if (match && match[1]) {
    return match[1];
  } else {
    throw new Error("Restaurant ID not found in the URL.");
  }
}

const restaurantFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Menu Item Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Menu Item Name must not be longer than 30 characters.",
    }),
  price: z
    .string()
    .min(1, {
      message: "Price must be at least 1 character.",
    })
    .max(30, {
      message: "Price must not be longer than 30 characters.",
    }),
  description: z
    .string()
    .max(160, {
      message: "Description must not be longer than 160 characters.",
    })
    .min(4, {
      message: "Description must be at least 4 characters.",
    })
    .optional(),
  ingredients: z.array(z.string()).optional(),
});

type RestaurantFormValues = z.infer<typeof restaurantFormSchema>;

const defaultValues: Partial<RestaurantFormValues> = {
  ingredients: [],
};

const AddRestaurantItem = () => {
  const [loading, setLoading] = React.useState(false);
  const [imageUploadFormData, setImageUploadFormData] = React.useState(null);
  const form = useForm<RestaurantFormValues>({
    resolver: zodResolver(restaurantFormSchema),
    defaultValues,
    mode: "onChange",
  });
  const navigate = useNavigate();

  async function onSubmit(data: RestaurantFormValues) {
    try {
      setLoading(true);
      const finalisedData = {
        imageFileData: imageUploadFormData,
        restaurantId: getRestaurantIdFromUrl(),
        ...data,
      };
      const response = await addRestaurantItem(finalisedData);
      if (response) {
        setLoading(false);
        handleToastSuccess(response.message);
        setTimeout(() => {
          navigate("/admin/restaurants");
        }, 2500);
      }
    } catch (err) {
      handleToastError("Something went wrong");
    }
  }

  if (loading) return <Loader />;

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <p className="text-3xl font-bold">Details</p>
            <p className="text-xs">Enter the details about your menu item.</p>
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Menu Item Name</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    placeholder="Menu Item Name"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The name of your menu item. This will be displayed to
                  customers.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input className="bg-white" placeholder="Price" {...field} />
                </FormControl>
                <FormDescription>The price of your menu item.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your menu item"
                    className="resize-none bg-white"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A brief description of your menu item. This will help
                  customers know more about it.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ingredients"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ingredients</FormLabel>
                <FormControl>
                  <Select onValueChange={(values) => field.onChange(values)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ingredients" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ingredient 1">Ingredient 1</SelectItem>
                      <SelectItem value="Ingredient 2">Ingredient 2</SelectItem>
                      {/* Add more options as needed */}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Select ingredients that are used in this menu item.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <UploadDropzone setImageUploadFormData={setImageUploadFormData} />
          <Button type="submit">Add Menu Item</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddRestaurantItem;
