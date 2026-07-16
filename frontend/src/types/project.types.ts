export type ProjectStatus =
  | "open"
  | "in_progress"
  | "in_review"
  | "completed"
  | "cancelled";

type ProjectSize = "small" | "medium" | "large";

type ExperienceLevel = "junior" | "mid-level" | "senior";

type Duration =
  | "less_than_1_month"
  | "1_to_3_month"
  | "3_to_6_month"
  | "more_than_6_month";

type CategoryOrSkills = {
  id: number;
  name: string;
};

type Project = {
  id: number;
  title: string;
  budget: string;
  status: ProjectStatus;
  created_at: string;
  proposals_count: number;
};

export type BrowseProject = Project & {
  description: string;
  experience_level: ExperienceLevel;
  duration: Duration;
  size: ProjectSize;
  category: CategoryOrSkills;
  skills: CategoryOrSkills[];
};

export type ClientProject = Project;
