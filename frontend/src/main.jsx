import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/index.css";
import "./assets/App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes.jsx";
import { AuthProvider } from "./context/AuthContext";
import "./i18n/i18n";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  // </StrictMode>,
);
