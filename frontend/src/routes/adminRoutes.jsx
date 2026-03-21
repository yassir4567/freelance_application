import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboardPage";


export const adminRoutes = [
    {
        path : '/dashboard/admin' , 
        element : <AdminLayout /> ,
        children : [
            {index : true , element : <AdminDashboard />} ,
        ]
    }
]