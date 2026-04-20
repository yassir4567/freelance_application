import FreelancerLayout from "../layouts/FreelancerLayout";
import FindProjectPage from "../features/projects/pages/FindProjectPage";
import FreelancerDashboardPage from "../features/freelancer-dashboard/pages/FreelancerDashboardPage";
import ProjectDetailPage from "../features/projects/pages/ProjectDetailPage";

export const freelancerRoutes = [
  {
    path: "/dashboard/freelancer",
    element: <FreelancerLayout />,
    children: [
      { index: true, element: <FreelancerDashboardPage /> },
      { path: "find-project" , element : <FindProjectPage />},
      { path: "projects/:projectId" , element : <ProjectDetailPage />}
    ],
  },
];
