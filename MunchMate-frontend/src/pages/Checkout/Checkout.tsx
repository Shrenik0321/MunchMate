import Bill from "@/components/Bill/Bill";
import OrderConfirmation from "@/components/OrderConfirmation/OrderConfirmation";

const Checkout = () => {
  return (
    <div className="grid grid-cols-2 gap-8 mx-10 my-5">
      <div>
        <Bill />
      </div>
      <div>
        <OrderConfirmation />
      </div>
    </div>
  );
};

export default Checkout;
