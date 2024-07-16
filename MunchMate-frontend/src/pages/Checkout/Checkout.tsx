import { createOrder } from "@/api/createOrder";
import Bill from "@/components/Bill/Bill";
import BreadCrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import OrderConfirmation from "@/components/OrderConfirmation/OrderConfirmation";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useCartContext } from "@/hooks/useCartContext";
import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Checkout = () => {
  const { cart } = useCartContext();
  const { auth } = useAuthContext();
  const navigate = useNavigate();
  const [totalCost, setTotalCost] = React.useState(0);
  const [confirmOrder, setConfirmOrder] = React.useState(false);
  const [contactNo, setContactNo] = React.useState(auth.contactNo || "");
  const [address, setAddress] = React.useState("");

  React.useEffect(() => {
    async function handleConfirmOrder() {
      try {
        const confirmedOrderData = {
          userId: auth._id,
          customerName: auth.name,
          restaurantId: cart[0].restaurantId,
          contactNumber: contactNo,
          address: address,
          orderedItems: cart.map((item: any) => ({
            itemName: item.name,
            restaurantItemId: item._id,
            quantity: 1,
          })),
          status: "Placed",
          totalCost: totalCost,
        };

        Cookies.set("confirmedOrder", JSON.stringify(confirmedOrderData), {
          expires: 1,
        });
        const response = await createOrder(confirmedOrderData);
        if (response.data) {
          navigate("/order-status", {
            state: { orderData: confirmedOrderData },
          });
        }
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
          <OrderConfirmation
            setConfirmOrder={setConfirmOrder}
            contactNo={contactNo}
            setContactNo={setContactNo}
            address={address}
            setAddress={setAddress}
          />
        </div>
        <div>
          <Bill cart={cart} setTotalCost={setTotalCost} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
