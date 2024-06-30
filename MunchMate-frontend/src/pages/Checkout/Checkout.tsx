import Bill from "@/components/Bill/Bill";
import BreadCrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import OrderConfirmation from "@/components/OrderConfirmation/OrderConfirmation";

const Checkout = () => {
  return (
    <div className="mx-10 my-5">
      <div className="my-5">
        <BreadCrumbs />
      </div>
      <div className="grid grid-cols-2 gap-8 ">
        <div>
          <OrderConfirmation />
        </div>
        <div>
          <Bill />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
