import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { getRecentSales } from "@/api/getRecentSales";
import Loader from "../Loader/Loader";

export function RecentSales() {
  const [loading, setLoading] = React.useState(false);
  const [recentSales, setRecentSales] = React.useState<any>([]);

  React.useEffect(() => {
    const getAnalytics = async () => {
      setLoading(true);
      try {
        const response = await getRecentSales();
        setRecentSales(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getAnalytics();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-8">
      {recentSales.map((sale: any) => (
        <div key={sale._id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={`/avatars/${sale.user[0]._id}.png`}
              alt="Avatar"
            />
            <AvatarFallback>
              {sale.user[0].name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {sale.user[0].name}
            </p>
            <p className="text-sm text-muted-foreground">
              {sale.user[0].email}
            </p>
          </div>
          <div className="ml-auto font-medium text-orange-500">
            +${sale.totalCost.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
}
