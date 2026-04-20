import { createBrowserRouter } from "react-router-dom";
import authRoutes from "./authRoutes";
import HomePage from "../features/home/pages/HomePage";
import { adminRoutes } from "./adminRoutes";
import { clientRoutes } from "./clientRoutes";
import { freelancerRoutes } from "./freelancerRoutes";
import UnauthorizedPage from "../shared/UnauthorizedPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
  ...authRoutes,
  ...adminRoutes,
  ...clientRoutes,
  ...freelancerRoutes,
]);
