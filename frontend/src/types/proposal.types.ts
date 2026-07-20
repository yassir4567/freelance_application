import type { Category } from "./category.types";
import type { Conversation } from "./conversation.types";
import type { Project } from "./project.types";
import type { Freelancer, User } from "./user.types";

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
  conversation?: Conversation;
};

export type ClientProjectProposalType = Proposal & {
  freelancer: Pick<User, "id" | "first_name" | "last_name"> &
    Pick<Freelancer, "user_id" | "title">;
  conversation?: Conversation;
};
