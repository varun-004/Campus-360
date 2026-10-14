import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import AuthProvider from "./auth/AuthProvider";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <Toaster
        position="top-right"
        gutter={12}
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "12px",
            background: "#ffffff",
            color: "#0f172a",
            border: "1px solid #e2e8f0",
            boxShadow: "0 8px 24px -8px rgb(15 23 42 / 0.16)",
            fontSize: "14px",
            fontWeight: 500,
            padding: "12px 16px",
          },
          success: {
            iconTheme: { primary: "#059669", secondary: "#ffffff" },
          },
          error: {
            duration: 5000,
            iconTheme: { primary: "#dc2626", secondary: "#ffffff" },
          },
        }}
      />
    </AuthProvider>
  </React.StrictMode>
);