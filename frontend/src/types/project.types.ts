import type { Category } from "./category.types";
import type { Skill } from "./skill.types";

export type ProjectStatus =
  | "open"
  | "in_progress"
  | "in_review"
  | "completed"
  | "cancelled";

export type ProjectSize = "small" | "medium" | "large";

export type ProjectExperienceLevel = "junior" | "mid-level" | "senior";

export type ProjectDuration =
  | "less_than_1_month"
  | "1_to_3_month"
  | "3_to_6_month"
  | "more_than_6_month";

export type Project = {
  id: number;
  title: string;
  budget: string;
  status: ProjectStatus;
  description: string;
  experience_level: ProjectExperienceLevel;
  duration: ProjectDuration;
  size: ProjectSize;
  category: Category;
  skills: Pick<Skill, "id" | "name">[];
  created_at: string;
  proposals_count: number;
};

export type BrowseProject = Project;

export type ClientProjectList = Pick<
  Project,
  "id" | "title" | "budget" | "status" | "created_at" | "proposals_count"
>;
