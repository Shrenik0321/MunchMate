import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
