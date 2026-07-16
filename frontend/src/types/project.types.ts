import type { Category } from "./category.type";
import type { Skill } from "./skill.type";

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

export type Project = {
  id: number;
  title: string;
  budget: string;
  status: ProjectStatus;
  description: string;
  experience_level: ExperienceLevel;
  duration: Duration;
  size: ProjectSize;
  category: Category;
  skills: Skill[];
  created_at: string;
  proposals_count: number;
};

export type BrowseProject = Project;

export type ClientProject = Pick<
  Project,
  "id" | "title" | "budget" | "status" | "created_at" | "proposals_count"
>;
