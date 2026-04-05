import AdminLayout from "../layouts/AdminLayout";
import AdminCategoriePage from "../pages/admin/AdminCategoriesPage";
import AdminDashboard from "../pages/admin/AdminDashboardPage";
import AdminProjectsPage from "../pages/admin/AdminProjectsPage";
import AdminSkillsPage from "../pages/admin/AdminSkillsPage";
import AdminUsersPage from "../pages/admin/AdminUsersPage";

export const adminRoutes = [
  {
    path: "/dashboard/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "users", element: <AdminUsersPage /> },
      { path: "projects", element: <AdminProjectsPage /> },
      { path: "categories", element: <AdminCategoriePage /> },
      { path: "skills", element: <AdminSkillsPage /> },
    ],
  },
];
