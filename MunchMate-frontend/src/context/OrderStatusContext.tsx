import React, { createContext, useState, ReactNode } from "react";

interface OrderStatusType {
  orderStatus: any;
  setOrderStatus: React.Dispatch<React.SetStateAction<any>>;
}

const OrderStatusContext = createContext<OrderStatusType | undefined>(
  undefined
);

export default OrderStatusContext;

export const OrderStatusProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [orderStatus, setOrderStatus] = useState<any>("");

  return (
    <OrderStatusContext.Provider value={{ orderStatus, setOrderStatus }}>
      {children}
    </OrderStatusContext.Provider>
  );
};
