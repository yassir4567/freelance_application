import type { Conversation } from "./conversation.types";
import type { Deliverable } from "./deliverable.types";
import type { User } from "./user.types";

type ContractStatus = "pending" | "active" | "completed" | "rejected";

type Contract = {
  id: number;
  fichier_pdf: string;
  description: string;
  status: ContractStatus;
  final_price: number;
  final_deadline: string;
};

type ContractListItem = Pick<Contract, "id" | "status" | "final_price"> & {
  project_title: string;
  total_deliverables: number;
  completed_deliverables: number;
  current_deliverable: Pick<
    Deliverable,
    "id" | "title" | "deadline" | "status" | "created_at"
  > | null;
  conversation: Pick<Conversation, "id">;
};

export type ClientContractListItem = ContractListItem & {
  freelancer: Pick<User, "id" | "first_name" | "last_name" | "avatar">;
};

export type FreelancerContractListItem = ContractListItem & {
  client: Pick<User, "id" | "first_name" | "last_name" | "avatar">;
};
