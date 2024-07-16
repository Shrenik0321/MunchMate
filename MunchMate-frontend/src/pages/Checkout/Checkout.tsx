import { createOrder } from "@/api/createOrder";
import Bill from "@/components/Bill/Bill";
import BreadCrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import OrderConfirmation from "@/components/OrderConfirmation/OrderConfirmation";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useCartContext } from "@/hooks/useCartContext";
import React from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart } = useCartContext();
  const { auth } = useAuthContext();
  const navigate = useNavigate();
  const [confirmOrder, setConfirmOrder] = React.useState(false);

  React.useEffect(() => {
    async function handleConfirmOrder() {
      try {
        const orderData = {
          userId: auth._id,
          restaurantId: cart[0].restaurantId,
          contactNumber: "1223344",
          address: "123 Main St, Springfield, IL",
          orderedItems: cart.map((item: any) => ({
            restaurantItemId: item._id,
            quantity: 1,
          })),
          status: "Placed",
        };

        const response = createOrder(orderData);
        // navigate("/order-status");
      } catch (err) {
        console.log(err);
      }
    }

    if (confirmOrder) {
      handleConfirmOrder();
    }
  }, [confirmOrder]);

  return (
    <div className="mx-10 my-5">
      <div className="my-5">
        <BreadCrumbs />
      </div>
      <div className="grid grid-cols-2 gap-8 ">
        <div>
          <OrderConfirmation setConfirmOrder={setConfirmOrder} />
        </div>
        <div>
          <Bill cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
