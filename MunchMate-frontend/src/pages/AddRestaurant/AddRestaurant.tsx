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
import { addRestaurant } from "@/api/addRestaurant";
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

const restaurantFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Restaurant Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Restaurant Name must not be longer than 30 characters.",
    }),
  address: z
    .string()
    .min(2, {
      message: "Restaurant Address must be at least 2 characters.",
    })
    .max(30, {
      message: "Restaurant Address must not be longer than 30 characters.",
    }),
  contactNumber: z
    .string()
    .min(2, {
      message: "Restaurant Contact Number must be at least 2 characters.",
    })
    .max(30, {
      message:
        "Restaurant Contact Number must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please enter a contact email.",
    })
    .email({
      message: "Please enter a valid email address.",
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
  rating: z
    .number()
    .min(0, {
      message: "Rating must be at least 0.",
    })
    .max(5, {
      message: "Rating must be at most 5.",
    })
    .optional(),
  tags: z.array(z.string()).optional(),
});

type RestaurantFormValues = z.infer<typeof restaurantFormSchema>;

const defaultValues: Partial<RestaurantFormValues> = {
  description: "Best food in town.",
  rating: 0,
  tags: [],
};

const AddRestaurant = () => {
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
      const finalisedData = { imageFileData: imageUploadFormData, ...data };
      const response = await addRestaurant(finalisedData);
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
            <p className="text-xs">Enter the details about your restaurant.</p>
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Restaurant Name</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    placeholder="Restaurant Name"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The name of your restaurant. This will be displayed to
                  customers.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Restaurant Address</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    placeholder="Restaurant Address"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The address of your restaurant. This will be displayed to
                  customers.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    placeholder="Contact Number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide a contact number for customers to reach you.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    placeholder="email@example.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide an email address for customers to contact you.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    type="number"
                    placeholder="Rating"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide a rating for your restaurant (0-5).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Restaurant Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your restaurant"
                    className="resize-none bg-white"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A brief description of your restaurant. This will help
                  customers know more about you.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Select onValueChange={(values) => field.onChange(values)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tags" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fast food">Fast food</SelectItem>
                      <SelectItem value="Casual Dining">
                        Casual Dining
                      </SelectItem>
                      <SelectItem value="Family">Family</SelectItem>
                      {/* Add more options as needed */}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Select tags that best describe your restaurant.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <UploadDropzone setImageUploadFormData={setImageUploadFormData} />
          <Button type="submit">Add Restaurant</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddRestaurant;
