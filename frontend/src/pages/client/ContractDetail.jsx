import styles from "./ContractDetail.module.css";
import SimpleCard from "../../components/cards/SimpleCard";
import ContractHeader from "../../components/contracts/ContractHeader";
import ContractParty from "../../components/contracts/ContractParty";
import ContractSummary from "../../components/contracts/ContractSummary";
import ContractDeliverables from "../../components/contracts/ContractDeliverables";
import ContractPayments from "../../components/contracts/ContractPayments";
import ContractTimeline from "../../components/contracts/ContractTimeline";

function ContractDetail() {
  const deliverableStatusClass = {
    active: "status-success",
    completed: "status-purple",
    rejected: "status-danger",
    cancelled: "status-danger",
  };

  const deliverables = [
    {
      id: 1,
      title: "Homepage UI Design",
      description:
        "Design and implement the homepage with a responsive layout and modern UI.",
      amount: 1500,
      deadline: "2026-01-23",
      status: "accepted",
      unlocked_at: "2026-01-15",
      submitted_at: "2026-01-23",
      accepted_at: "2026-01-24",
      submission_links: [
        "https://figma.com/file/homepage-design",
        "https://demo-homepage.vercel.app",
      ],
      submission_note:
        "Homepage fully implemented with responsive design and animations.",
      payment_status: "released",
    },
    {
      id: 2,
      title: "Authentication System",
      description: "Implement login, register, and role-based authentication.",
      amount: 1200,
      deadline: "2026-02-06",
      status: "revision_requested",
      unlocked_at: "2026-01-28",
      submitted_at: "2026-02-05",
      accepted_at: null,
      submission_links: [
        "https://github.com/user/auth-module",
        "https://auth-demo.vercel.app",
      ],
      submission_note:
        "Authentication system is working but requires UI fixes based on client feedback.",
      payment_status: "escrow",
    },
    {
      id: 3,
      title: "Project & Proposal Module",
      description: "Build project posting and proposal submission system.",
      amount: 1800,
      deadline: "2026-02-18",
      status: "unlocked",
      unlocked_at: "2026-02-10",
      submitted_at: null,
      accepted_at: null,
      submission_links: [],
      submission_note: "",
      payment_status: "refunded",
    },
    {
      id: 4,
      title: "Payment & Escrow Simulation",
      description: "Integrate payment flow and escrow logic in test mode.",
      amount: 1700,
      deadline: "2026-02-28",
      status: "pending",
      unlocked_at: null,
      submitted_at: null,
      accepted_at: null,
      submission_links: [],
      submission_note: "",
      payment_status: "pending",
    },
    {
      id: 5,
      title: "Payment & Escrow Simulation",
      description: "Integrate payment flow and escrow logic in test mode.",
      amount: 1700,
      deadline: "2026-02-28",
      status: "submitted",
      unlocked_at: "2026-02-28",
      submitted_at: "2026-02-28",
      accepted_at: null,
      submission_links: [
        "https://github.com/user/auth-module",
        "https://auth-demo.vercel.app",
      ],
      submission_note:
        "Authentication system is working but requires UI fixes based on client feedback.",
      payment_status: "escrow",
    },
  ];

  const contractTimeline = [
    {
      id: 1,
      date: "Jan 14, 2026",
      label: "Contract created",
      title: "Project kickoff and scope confirmed",
      description:
        "Both parties agreed on the deliverables, milestones, and initial escrow allocation.",
      status: "completed",
    },
    {
      id: 2,
      date: "Jan 18, 2026",
      label: "First milestone",
      title: "Homepage design delivered",
      description:
        "The homepage concept and responsive layouts were submitted and approved by the client.",
      status: "completed",
    },
    {
      id: 3,
      date: "Feb 05, 2026",
      label: "Revision cycle",
      title: "Authentication module feedback shared",
      description:
        "A revision round was requested to refine the UI flow and account recovery screens.",
      status: "current",
    },
    {
      id: 4,
      date: "Feb 14, 2026",
      label: "Upcoming deadline",
      title: "Next deliverable due for review",
      description:
        "The freelancer is expected to submit the revised authentication system for client approval.",
      status: "upcoming",
    },
  ];

  let user = "client";

  return (
    <div className={styles.contractDetailPage}>
      <ContractHeader deliverableStatusClass={deliverableStatusClass} />
      <ContractParty user={user} />
      <ContractSummary />
      <ContractTimeline contractTimeline={contractTimeline} />
      <ContractDeliverables deliverables={deliverables} />
      <ContractPayments deliverables={deliverables} />
    </div>
  );
}

export default ContractDetail;
