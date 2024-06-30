import React, { createContext, useState, ReactNode } from "react";

interface CartContextType {
  cart: any;
  setCart: React.Dispatch<React.SetStateAction<any>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export default CartContext;

export const CartContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<any>([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
