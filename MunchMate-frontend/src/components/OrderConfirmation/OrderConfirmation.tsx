import { useState } from "react";
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
import { useAuthContext } from "@/hooks/useAuthContext";

const OrderConfirmation = ({
  setConfirmOrder,
  contactNo,
  setContactNo,
  address,
  setAddress,
}: any) => {
  const { auth } = useAuthContext();
  const [error, setError] = useState("");

  const handleConfirmOrder = () => {
    if (!address) {
      setError("Address is required.");
      return;
    }
    setConfirmOrder(true);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Delivery Details</CardTitle>
          <CardDescription>Confirm details for delivery.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Name" value={auth.name} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Email" value={auth.email} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contactNo">Contact Number</Label>
            <Input
              id="contactNo"
              placeholder="Contact Number"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleConfirmOrder}>
            Confirm Order
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrderConfirmation;
