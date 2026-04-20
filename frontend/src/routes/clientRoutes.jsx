import ClientLayout from "../layouts/ClientLayout";
import ClientDashboardPage from "../features/client-dashboard/pages/ClientDashboardPage";
import PostJobPage from "../features/projects/pages/PostJobPage";
import ProjectsPage from "../features/projects/pages/ProjectsPage";
import ProjectProposalsPage from "../features/projects/pages/ProjectProposalsPage";
import ProjectOverviewPage from "../features/projects/pages/ProjectOverviewPage";
import ProjectLayout from "../features/projects/components/ProjectLayout";
import ContractsPage from "../features/contracts/pages/ContractsPage";
import ContractDetail from "../features/contracts/pages/ContractDetail";
import MessagesPage from "../features/messages/pages/MessagesPage";
import ProtectedRoutes from "./ProtectedRoutes";

export const clientRoutes = [
  {
    element: <ProtectedRoutes role={"client"} />,
    children: [
      {
        path: "/dashboard/client",
        element: <ClientLayout />,
        children: [
          { index: true, element: <ClientDashboardPage /> },
          { path: "postjob", element: <PostJobPage /> },
          { path: "projects", element: <ProjectsPage /> },
          {
            path: "projects/:projectId",
            element: <ProjectLayout />,
            children: [
              { index: true, element: <ProjectOverviewPage /> },
              { path: "proposals", element: <ProjectProposalsPage /> },
            ],
          },
          { path: "contracts", element: <ContractsPage /> },
          { path: "contracts/:contractId", element: <ContractDetail /> },
          { path: "messages", element: <MessagesPage /> },
        ],
      },
    ],
  },
];
