import { createBrowserRouter } from "react-router-dom";
import authRoutes from "./authRoutes";
import HomePage from "../pages/HomePage";
import { adminRoutes } from "./adminRoutes";
import { clientRoutes } from "./clientRoutes";
export const router = createBrowserRouter([
    {
        path : '/' , 
        element : <HomePage />
    } ,
    ...authRoutes ,
    ...adminRoutes ,
    ...clientRoutes
]);
