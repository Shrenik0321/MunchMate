import React, { createContext, useState, ReactNode } from "react";

interface ConfirmedOrderType {
  confirmedData: any;
  setConfirmedData: React.Dispatch<React.SetStateAction<any>>;
}

const ConfirmedOrderContext = createContext<ConfirmedOrderType | undefined>(
  undefined
);

export default ConfirmedOrderContext;

export const ConfirmedOrderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [confirmedData, setConfirmedData] = useState<any>([]);

  return (
    <ConfirmedOrderContext.Provider value={{ confirmedData, setConfirmedData }}>
      {children}
    </ConfirmedOrderContext.Provider>
  );
};
