import ClientLayout from "../layouts/ClientLayout";
import ClientDashboardPage from "../features/client-dashboard/pages/ClientDashboardPage";
import PostJobPage from "../features/projects/pages/PostJobPage";
import ClientProjectsPage from "../features/projects/pages/ClientProjectsPage";
import ProjectProposalsPage from "../features/projects/pages/ProjectProposalsPage";
import ClientProjectDetail from "../features/projects/pages/ClientProjectDetail";
import ProjectLayout from "../features/projects/layouts/ProjectLayout";
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
          { path: "projects", element: <ClientProjectsPage /> },
          {
            path: "projects/:projectId",
            element: <ProjectLayout />,
            children: [
              { index: true, element: <ClientProjectDetail /> },
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
