import Bill from "@/components/Bill/Bill";
import OrderConfirmation from "@/components/OrderConfirmation/OrderConfirmation";

const Checkout = () => {
  return (
    <div className="grid grid-cols-2 gap-8 mx-10 my-5">
      <div>
        <OrderConfirmation />
      </div>
      <div>
        <Bill />
      </div>
    </div>
  );
};

export default Checkout;
