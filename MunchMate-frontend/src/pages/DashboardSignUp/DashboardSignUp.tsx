import { userSignUp } from "@/api/userSignUp";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/hooks/useAuthContext";
import { handleToastError, handleToastSuccess } from "@/utils/toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const DashboardSignUp = () => {
  const { setAuth } = useAuthContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUserRegister = async (data: any) => {
    try {
      if (data.role === "admin") {
        data = { ...data, role: ["Admin", "User"] };
      } else {
        data = { ...data, role: ["User"] };
      }

      const response = await userSignUp(data);
      if (response) {
        setAuth(response);
        handleToastSuccess(response.message);
        setTimeout(() => {
          navigate("/dashboard-sign-in");
        }, 2500);
      }
    } catch (err: any) {
      if (err?.response?.data) {
        handleToastError(err?.response?.data?.message);
      } else {
        handleToastError("Something went wrong");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader className="flex justify-center items-center">
          <CardTitle className="font-bold">Register</CardTitle>
          <CardDescription className="font-semibold text-[#ef4444]">
            Register your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleUserRegister)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Name"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">Name is required</span>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    Email is required
                  </span>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="contactNo">Contact Number</Label>
                <Input
                  id="contactNo"
                  placeholder="Contact Number"
                  {...register("contactNo", { required: true })}
                />
                {errors.contactNo && (
                  <span className="text-red-500 text-sm">
                    Contact Number is required
                  </span>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    Password is required
                  </span>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", { required: true })}
                />
                {errors.confirmPassword && (
                  <span className="text-red-500 text-sm">
                    Confirm password is required
                  </span>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="role">User Role</Label>
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="admin"
                      value="admin"
                      {...register("role", { required: true })}
                    />
                    <Label
                      htmlFor="admin"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Admin
                    </Label>
                  </div>
                  {errors.role && (
                    <span className="text-red-500 text-sm">
                      Please select at least one role
                    </span>
                  )}
                </div>
              </div>
            </div>
            <CardFooter className="flex flex-col items-center">
              <Button type="submit" className="w-full mt-4">
                Register
              </Button>
              <div className="mt-2 text-sm text-gray-600">
                Already have an account?{" "}
                <a href="/dashboard-sign-in" className="text-[#ef4444]">
                  Sign in
                </a>
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSignUp;
