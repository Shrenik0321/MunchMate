import { useContext } from "react";
import ConfirmedOrderContext from "../context/ConfirmedOrderContext";

export const useConfirmedOrder = () => {
  const context = useContext(ConfirmedOrderContext);

  if (!context) {
    throw Error(
      "useConfirmedOrder must be used inside an ConfirmedOrderProvider"
    );
  }

  return context;
};
