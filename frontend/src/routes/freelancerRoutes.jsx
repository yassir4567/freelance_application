import FreelancerLayout from "../layouts/FreelancerLayout";
import FindProjectPage from "../pages/freelancer/FindProjectPage";
import FreelancerDashboardPage from "../pages/freelancer/FreelancerDashboardPage";
import ProjectDetailPage from "../pages/freelancer/ProjectDetailPage";

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
