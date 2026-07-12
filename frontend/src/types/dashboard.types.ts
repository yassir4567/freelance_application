import type { ProjectStatus } from "./project.types";

type ClientDashboardStats = {
  freelancer_hired: number;
  ongoing_contracts: number;
  received_proposals: number;
  total_projects: number;
};

type ClientDashboardRecentProjects = {
  id: number;
  status: ProjectStatus;
  title: string;
  proposals_count: number;
  created_at: string;
};

export type ClientDashboard = {
  stats: ClientDashboardStats;
  recent_projects: ClientDashboardRecentProjects;
};
