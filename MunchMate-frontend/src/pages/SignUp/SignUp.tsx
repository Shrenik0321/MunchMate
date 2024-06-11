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

const SignUp = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader className="flex justify-center items-center">
          <CardTitle className="font-bold">Register</CardTitle>
          <CardDescription className="font-semibold text-[#ef4444]">
            Register to account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name" />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input id="name" placeholder="Email" />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <Input id="name" placeholder="Password" />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Confirm Password</Label>
                <Input id="name" placeholder="Confirm Password" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <Button className="w-full">Register</Button>
          <div className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/sign-in" className="text-[#ef4444]">
              Sign in
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
