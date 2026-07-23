type DeliverableStatus =
  | "pending"
  | "unlocked"
  | "submitted"
  | "accepted"
  | "revision_request"
  | "cancelled";

export type Deliverable = {
  id: number;
  title: string;
  description: string;
  amount: number;
  deadline: string | null;
  deliverable_links: string[] | null;
  created_at: string;
  unlocked_at: string | null;
  submitted_at: string | null;
  accepted_at: string | null;
  status: DeliverableStatus;
  position: number;
  submission_note: string | null;
};
