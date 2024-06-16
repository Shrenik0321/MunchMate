import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Bill = () => {
  const deliveryCost = 3.0;
  const foodItems = [
    { name: "Pancakes", price: 7.99 },
    { name: "Caesar Salad", price: 9.99 },
    { name: "Spaghetti Carbonara", price: 12.99 },
  ];
  const totalCost =
    foodItems.reduce((total, item) => total + item.price, 0) + deliveryCost;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardDescription>Pay</CardDescription>
          <CardTitle className="text-4xl">{`$ ${totalCost}`}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          {foodItems.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between">
            <span>Delivery</span>
            <span>${deliveryCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${totalCost.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Bill;
