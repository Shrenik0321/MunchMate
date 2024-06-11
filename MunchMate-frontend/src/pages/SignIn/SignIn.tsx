import { userSignIn } from "@/api/userSignIn";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleToastError, handleToastSuccess } from "@/utils/toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUserLogin = async (data: any) => {
    try {
      const response = await userSignIn(data);
      if (response) {
        handleToastSuccess(response.message);
        setTimeout(() => {
          navigate("/manage-restaurant");
        }, 2500);
      }
    } catch (err) {
      handleToastError("Something went wrong");
    }
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <div className="flex justify-center items-center h-screen">
        <Card className="w-[350px]">
          <CardHeader className="flex justify-center items-center">
            <CardTitle className="font-bold">Login</CardTitle>
            <CardDescription className="font-semibold text-[#ef4444]">
              Login to account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleUserLogin)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email", { required: true })}
                    id="email"
                    placeholder="User Email"
                  />
                  {errors.email && (
                    <span className="text-red-500">
                      This field is required.
                    </span>
                  )}
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("password", { required: true })}
                    id="password"
                    type="password"
                    placeholder="User Password"
                  />
                  {errors.password && (
                    <span className="text-red-500">
                      This field is required.
                    </span>
                  )}
                </div>
              </div>
              <Button className="w-full mt-4" type="submit">
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <div className="mt-2 text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/sign-up" className="text-[#ef4444]">
                Sign up
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default SignIn;
