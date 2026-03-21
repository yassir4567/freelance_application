import ClientLayout from "../layouts/ClientLayout";
import ClientDashboardPage from "../pages/client/ClientDashboardPage";
import PostJobPage from "../pages/client/PostJobPage";


export const clientRoutes = [
    {
        path : '/dashboard/client' , 
        element : <ClientLayout />,
        children : [
            {index : true , element : <ClientDashboardPage />},
            {path : 'postjob' , element : <PostJobPage />}
        ]
    }
]