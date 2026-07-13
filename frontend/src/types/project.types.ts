export type ProjectStatus =
  | "open"
  | "in_progress"
  | "in_review"
  | "completed"
  | "cancelled";

type CategoryOrSkills = {
  id: number;
  name: string;
};

type Project = {
  id: number;
  title: string;
  budget: string;
  status: string;
  created_at: string;
};

export type BrowseProjects = Project & {
  category_id: number;
  description: string;
  experience_level: string;
  duratin: string;
  proposals_count: number;
  category: CategoryOrSkills;
  skills: CategoryOrSkills[];
};

export type ClientProjects = Project;
