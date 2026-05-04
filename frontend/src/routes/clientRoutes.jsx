import ClientLayout from "../layouts/ClientLayout";
import ClientDashboardPage from "../features/client-dashboard/pages/ClientDashboardPage";
import PostProjectPage from "../features/projects/pages/PostProjectPage";
import ClientProjectsPage from "../features/projects/pages/ClientProjectsPage";
import ProjectProposalsPage from "../features/proposals/pages/ProjectProposalsPage";
import ClientProjectDetail from "../features/projects/pages/ClientProjectDetail";
import ProjectLayout from "../features/projects/layouts/ProjectLayout";
import ClientContractsPage from "../features/contracts/pages/ClientContractsPage";
import ContractDetail from "../features/contracts/pages/ContractDetail";
import MessagesPage from "../features/messages/pages/MessagesPage";
import ProtectedRoutes from "./ProtectedRoutes";
import ProfilePage from "../features/profile/pages/ProfilePage";
import ProfileLayout from "../features/profile/layouts/ProfileLayout";

export const clientRoutes = [
  {
    element: <ProtectedRoutes role={"client"} />,
    children: [
      {
        path: "/dashboard/client",
        element: <ClientLayout />,
        children: [
          { index: true, element: <ClientDashboardPage /> },
          { path: "postjob", element: <PostProjectPage /> },
          { path: "projects", element: <ClientProjectsPage /> },
          {
            path: "projects/:projectId",
            element: <ProjectLayout />,
            children: [
              { index: true, element: <ClientProjectDetail /> },
              { path: "proposals", element: <ProjectProposalsPage /> },
            ],
          },
          { path: "contracts", element: <ClientContractsPage /> },
          { path: "contracts/:contractId", element: <ContractDetail /> },
          { path: "messages", element: <MessagesPage /> },
          {
            path: "profile",
            element: <ProfileLayout />,
            children: [{ index: true, element: <ProfilePage /> }],
          },
        ],
      },
    ],
  },
];
