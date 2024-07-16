import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { CartContextProvider } from "./context/CartContext.tsx";
import { ConfirmedOrderProvider } from "./context/ConfirmedOrderContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <CartContextProvider>
          <ConfirmedOrderProvider>
            <Routes>
              <Route path="*" element={<App />} />
            </Routes>
          </ConfirmedOrderProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
