import type { Category } from "./category.types";
import type { Conversation } from "./conversation.types";
import type { Project } from "./project.types";
import type { User } from "./user.types";

export type ProposalStatus = "pending" | "accepted" | "rejected";

export type Proposal = {
  id: number;
  project_id?: number;
  cover_letter: string;
  status: ProposalStatus;
  delivery_time: string;
  price: number;
  created_at: string;
};

export type FreelancerProposalType = Proposal & {
  project: Pick<Project, "id" | "title"> & {
    client: Pick<User, "id" | "first_name" | "last_name">;
    category: Category;
  };
  conversation: Conversation;
};
