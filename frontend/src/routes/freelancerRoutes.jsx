import FreelancerLayout from "../layouts/FreelancerLayout";
import BrowseProjectsPage from "../features/projects/pages/BrowseProjectsPage";
import FreelancerDashboardPage from "../features/freelancer-dashboard/pages/FreelancerDashboardPage";
import BrowseProjectDetail from "../features/projects/pages/BrowseProjectDetail";
import ProtectedRoutes from "./ProtectedRoutes";
import FreelancerProposalsPage from "../features/proposals/pages/FreelancerProposalsPage";
import FreelancerContractsPage from "../features/contracts/pages/FreelancerContractsPage";
// import ContractDetail from "../features/contracts/pages/ContractDetail";

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
          { path: "my-proposals", element: <FreelancerProposalsPage /> },
          { path: "contracts", element: <FreelancerContractsPage /> },
          // { path: "contracts/:contractId", element: <ContractDetail /> },
          
        ],
      },
    ],
  },
];
