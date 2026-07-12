import type { ProjectStatus } from "./project.types";
import type { User } from "./user.types";

type FreelancerDashboardStats = {
  accepted_proposals: number;
  active_projects: number;
  completed_contracts: number;
};

export type FreelancerDashboardActiveContracts = {
  id: number;
  title: string;
  final_price: number;
  final_deadline: string;
  client: Pick<
    User,
    "id" | "first_name" | "last_name" | "avatar" | "avatar_url"
  >;
};

export type FreelancerDashboard = {
  stats: FreelancerDashboardStats;
  active_contracts: FreelancerDashboardActiveContracts[];
};

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
