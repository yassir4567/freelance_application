import type { Category } from "./category.type";

export type Skill = {
  id: number;
  name: string;
  categories: Category[];
};
