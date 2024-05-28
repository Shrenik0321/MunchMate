import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
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
import UploadDropzone from "../UploadDropzone/UploadDropzone";

const restaurantFormSchema = z.object({
  restaurantName: z
    .string()
    .min(2, {
      message: "Restaurant Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Restaurant Name must not be longer than 30 characters.",
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
    }),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
});

type RestaurantFormValues = z.infer<typeof restaurantFormSchema>;

const defaultValues: Partial<RestaurantFormValues> = {
  description: "Best food in town.",
  urls: [
    { value: "https://restaurantwebsite.com" },
    { value: "http://instagram.com/restaurant" },
  ],
};

const AddRestaurant = () => {
  const form = useForm<RestaurantFormValues>({
    resolver: zodResolver(restaurantFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  function onSubmit(data: RestaurantFormValues) {
    console.log(data);
    // Add your form submission logic here
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="restaurantName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Restaurant Name</FormLabel>
                <FormControl>
                  <Input placeholder="Restaurant Name" {...field} />
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Restaurant Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your restaurant"
                    className="resize-none"
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
          <div>
            {fields.map((field, index) => (
              <FormField
                control={form.control}
                key={field.id}
                name={`urls.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      URLs
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Add links to your website, social media profiles, or menu.
                    </FormDescription>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append({ value: "" })}
            >
              Add URL
            </Button>
          </div>

          <UploadDropzone />
          <Button type="submit">Add Restaurant</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddRestaurant;
