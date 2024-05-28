const OrderStatus = () => {
  return (
    <div>
      <div className="flex justify-between m-10">
        <div>
          <p className="text-3xl font-bold">
            Order Status: Awaiting Restaurant Confirmation
          </p>
        </div>
        <div>
          <p className="text-3xl font-bold">Expected by : 15:12</p>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
