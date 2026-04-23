import FreelancerLayout from "../layouts/FreelancerLayout";
import BrowseProjectsPage from "../features/projects/pages/BrowseProjectsPage";
import FreelancerDashboardPage from "../features/freelancer-dashboard/pages/FreelancerDashboardPage";
import BrowseProjectDetail from "../features/projects/pages/BrowseProjectDetail";
import ProtectedRoutes from "./ProtectedRoutes";

export const freelancerRoutes = [
  {
    element: <ProtectedRoutes role={"freelancer"} />,
    children: [
      {
        path: "/dashboard/freelancer",
        element: <FreelancerLayout />,
        children: [
          { index: true, element: <FreelancerDashboardPage /> },
          { path: "find-project", element: <BrowseProjectsPage /> },
          { path: "projects/:projectId", element: <BrowseProjectDetail /> },
        ],
      },
    ],
  },
];
