import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "@/components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { updateUser } from "@/api/updateUser";
import { handleToastError, handleToastSuccess } from "@/utils/toast";
import { useAuthContext } from "@/hooks/useAuthContext";

const userFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(50, {
      message: "Customer Name must not be longer than 50 characters.",
    }),
  contactNo: z
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
});

type UserFormValues = z.infer<typeof userFormSchema>;

const EditProfile = () => {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    mode: "onChange",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const { auth } = useAuthContext();

  React.useEffect(() => {
    if (auth) {
      const updatedOrderData = {
        id: auth._id,
        name: auth.name,
        email: auth.email,
        contactNo: auth.contactNo,
      };

      form.reset(updatedOrderData);
      setLoading(false);
    }
  }, [auth, form]);

  async function onSubmit(data: UserFormValues) {
    try {
      const updateData = {
        id: auth._id,
        ...data,
      };
      const response = await updateUser(updateData);
      if (response) {
        handleToastSuccess(response.message);
        setTimeout(() => {
          navigate("/");
        }, 2500);
      }
    } catch (err) {
      handleToastError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loader />;

  return (
    <div className="px-10 py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex justify-between">
            <div className="flex flex-col space-y-2">
              <p className="text-3xl font-bold">Update User Details</p>
              <p className="text-xs">Update the details about your user.</p>
            </div>
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input className="bg-white" placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className="bg-white" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactNo"
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
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex space-x-4">
            <Button type="submit">Update User</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditProfile;
