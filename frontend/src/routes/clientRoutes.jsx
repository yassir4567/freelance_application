import ClientLayout from "../layouts/ClientLayout";
import ClientDashboardPage from "../pages/client/ClientDashboardPage";
import PostJobPage from "../pages/client/PostJobPage";
import ProjectsPage from "../pages/client/ProjectsPage";
import ProjectProposalsPage from "../pages/client/ProjectProposalsPage";
import ProjectOverviewPage from "../pages/client/ProjectOverviewPage";
import ProjectLayout from "../layouts/ProjectLayout";
import ContractsPage from "../pages/client/ContractsPage";
import ContractDetail from "../pages/client/ContractDetail";
import MessagesPage from "../pages/client/MessagesPage";

export const clientRoutes = [
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
];
