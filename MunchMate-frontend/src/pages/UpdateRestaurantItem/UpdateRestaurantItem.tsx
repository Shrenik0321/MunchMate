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
import { updateRestaurant } from "@/api/updateRestaurant";
import UpdateImageDropzone from "@/components/UpdateImageDropzone/UpdateImageDropzone";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const restaurantItemFormSchema = z.object({
  itemName: z
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

type RestaurantFormValues = z.infer<typeof restaurantItemFormSchema>;

const UpdateRestaurantItem = () => {
  const [imageUploadFormData, setImageUploadFormData] = React.useState(null);
  const form = useForm<RestaurantFormValues>({
    resolver: zodResolver(restaurantItemFormSchema),
    mode: "onChange",
  });

  async function onSubmit(data: RestaurantFormValues) {
    try {
      const finalisedData = { imageFileData: imageUploadFormData, ...data };
      const response = await updateRestaurant(finalisedData);
      console.log(response);
      // Add your form submission logic here
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <p className="text-3xl font-bold">Update Menu Item Details</p>
            <p className="text-xs">Enter the details about your menu item.</p>
          </div>
          <FormField
            control={form.control}
            name="itemName"
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

          <UpdateImageDropzone
            // imageUrl={imageUrl}
            setImageUploadFormData={setImageUploadFormData}
          />
          <Button type="submit">Update Menu Item</Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateRestaurantItem;
