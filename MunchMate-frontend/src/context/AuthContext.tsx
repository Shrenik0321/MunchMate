import React, { createContext, useState, ReactNode } from "react";

// Define a type for the context value
interface AuthContextType {
  auth: any;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
}

// Create the context with a default value of the correct type
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<any>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
