import type { Category } from "./category.types";

export type Skill = {
  id: number;
  name: string;
  categories: Category[];
};
