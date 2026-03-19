import { createBrowserRouter } from "react-router-dom";
import authRoutes from "./authRoutes";
import HomePage from "../pages/HomePage";
export const router = createBrowserRouter([
    {
        path : '/' , 
        element : <HomePage />
    } ,
    ...authRoutes
]);
