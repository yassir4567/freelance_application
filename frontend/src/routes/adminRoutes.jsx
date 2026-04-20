import AdminLayout from "../layouts/AdminLayout";
import AdminCategoriePage from "../features/admin/pages/AdminCategoriesPage";
import AdminDashboard from "../features/admin/pages/AdminDashboardPage";
import AdminProjectsPage from "../features/admin/pages/AdminProjectsPage";
import AdminSkillsPage from "../features/admin/pages/AdminSkillsPage";
import AdminUsersPage from "../features/admin/pages/AdminUsersPage";
import UserDetails from "../features/admin/pages/UserDetails";


export const adminRoutes = [
  {
    path: "/dashboard/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "users", element: <AdminUsersPage /> },
      { path: "userdetails", element: <UserDetails /> },
      { path: "projects", element: <AdminProjectsPage /> },
      { path: "categories", element: <AdminCategoriePage /> },
      { path: "skills", element: <AdminSkillsPage /> },
    ],
  },
];
