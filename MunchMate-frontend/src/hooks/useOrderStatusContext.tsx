import { useContext } from "react";
import OrderStatusContext from "../context/OrderStatusContext";

export const useOrderStatusContext = () => {
  const context = useContext(OrderStatusContext);

  if (!context) {
    throw Error(
      "useOrderStatusContext must be used inside an OrderContextProvider"
    );
  }

  return context;
};
