import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loader from "@/components/Loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { updateOrder } from "@/api/updateOrder";
import { handleToastError, handleToastSuccess } from "@/utils/toast";
import { useOrderStatusContext } from "@/hooks/useOrderStatusContext";

const orderFormSchema = z.object({
  customerName: z
    .string()
    .min(2, {
      message: "Customer Name must be at least 2 characters.",
    })
    .max(50, {
      message: "Customer Name must not be longer than 50 characters.",
    }),
  address: z
    .string()
    .min(2, {
      message: "Order Address must be at least 2 characters.",
    })
    .max(200, {
      message: "Order Address must not be longer than 200 characters.",
    }),
  contactNumber: z
    .string()
    .min(2, {
      message: "Order Contact Number must be at least 2 characters.",
    })
    .max(50, {
      message: "Order Contact Number must not be longer than 50 characters.",
    }),
  email: z
    .string({
      required_error: "Please enter a contact email.",
    })
    .email({
      message: "Please enter a valid email address.",
    }),
  status: z.enum(
    ["Placed", "In Progress", "Completed", "Delivered", "Rejected"],
    {
      required_error: "Please select a status.",
    }
  ),
  restaurantName: z.string(),
  orderedItems: z.array(
    z.object({
      quantity: z.number().min(1, {
        message: "Quantity must be at least 1.",
      }),
      restaurantItemId: z.string(),
      name: z.string(),
    })
  ),
});

type OrderFormValues = z.infer<typeof orderFormSchema>;

const UpdateOrder = () => {
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    mode: "onChange",
  });
  const { fields } = useFieldArray({
    control: form.control,
    name: "orderedItems",
  });
  const { setOrderStatus } = useOrderStatusContext();

  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const location = useLocation();
  const orderData = location.state?.order;

  React.useEffect(() => {
    if (orderData) {
      const updatedOrderData = {
        id: orderData._id,
        customerName: orderData.userId.name,
        address: orderData.address,
        email: orderData.restaurantId.email,
        contactNumber: orderData.contactNumber,
        status: orderData.status,
        restaurantName: orderData.restaurantId.name,
        orderedItems: orderData.orderedItems.map((item: any) => ({
          quantity: item.quantity,
          restaurantItemId: item.restaurantItemId._id,
          name: item.restaurantItemId.name,
        })),
      };

      form.reset(updatedOrderData);
      setLoading(false);
    }
  }, [orderData, form]);

  async function onSubmit(data: OrderFormValues) {
    try {
      setLoading(true);
      const updateData = {
        id: orderData._id,
        ...data,
      };
      const response = await updateOrder(updateData);
      if (response) {
        setLoading(false);
        setOrderStatus(updateData.status);
        handleToastSuccess(response.message);
        setTimeout(() => {
          navigate("/admin/orders");
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
          <div className="flex justify-between">
            <div className="flex flex-col space-y-2">
              <p className="text-3xl font-bold">Update Details</p>
              <p className="text-xs">Enter the details about your order.</p>
            </div>
          </div>

          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Name</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    placeholder="Customer Name"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Name of the customer who made this order.
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
                <FormLabel>Order Address</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    placeholder="Order Address"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The address of your order. This will be displayed to
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
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Placed">Placed</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Select the current status of the order.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="restaurantName"
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
                  Name of the restaurant the order was made to.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="orderedItems"
            render={() => (
              <FormItem>
                <FormLabel>Ordered Items</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    {fields.map((field: any, index) => (
                      <div
                        key={field.id}
                        className="flex items-center space-x-4"
                      >
                        <Input
                          className="bg-white"
                          value={field.name}
                          disabled
                        />
                        <Input
                          type="number"
                          value={form
                            .watch(`orderedItems.${index}.quantity`)
                            .toString()}
                          onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            if (!isNaN(value)) {
                              form.setValue(
                                `orderedItems.${index}.quantity`,
                                value
                              );
                            }
                          }}
                          className="bg-white"
                        />
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormDescription>
                  Adjust the quantities of the ordered items.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex space-x-4">
            <Button type="submit">Update Order</Button>
            <Button type="submit" variant="destructive">
              Cancel Order
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdateOrder;
