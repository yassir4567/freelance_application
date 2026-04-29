import styles from "../styles/ContractDetail.module.css";
import ContractHeader from "../components/ContractHeader";
import ContractParty from "../components/ContractParty";
import ContractSummary from "../components/ContractSummary";
import ContractDeliverables from "../components/ContractDeliverables";
import ContractPayments from "../components/ContractPayments";
import ContractTimeline from "../components/ContractTimeline";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getClientContractDetail } from "../../../api/contracts/getClientContractDetail";
import { useAuth } from "../../../context/AuthContext";
import { formatDate, getRelativeTime } from "../../../utils/helpers";

function ContractDetail() {
  const { contractId } = useParams();
  const [contract, setContract] = useState();
  const { user } = useAuth();

  useEffect(() => {
    const loadContract = async () => {
      const result = await getClientContractDetail(contractId);
      setContract(result.data);
    };
    loadContract();
  }, []);

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

  let role = user.role;

  const headerContent = useMemo(() => {
    return {
      status: contract?.status,
      project_title: contract?.project?.title,
      budget: contract?.final_price,
    };
  }, [contract]);

  const userInfo = useMemo(() => {
    return {
      fullname: `${contract?.freelancer.first_name} ${contract?.freelancer.last_name}`,
      avatar: contract?.freelancer.avatar,
      id: contract?.freelancer.user_id,
    };
  }, [contract]);

  const headerInfo = useMemo(() => {
    return {
      status: contract?.status,
      created_at: formatDate(contract?.created_at),
      ...(contract?.status === "active" && {
        cur_deliverable_deadline: formatDate(
          contract?.deliverables?.find((del) =>
            ["unlocked", "revision_request", "submitted"].includes(del.status),
          )?.created_at,
        ),
      }),
    };
  }, [contract]);

  const summary = useMemo(() => {
    const completed_deliverables = contract?.deliverables?.filter(
      (del) => del.status === "accepted",
    ).length;

    const payments = contract?.deliverables
      ?.map((del) => del.payment)
      .filter((payment) => payment !== null);

    return {
      description: contract?.description,
      budget: contract?.final_price,
      deadline: contract?.final_deadline,
      total_deliverables: contract?.deliverables?.length,
      completed_deliverables: completed_deliverables,
      payments: payments,
      contract_pdf: contract?.fichier_pdf,
    };
  }, [contract]);

  return (
    <div className={styles.contractDetailPage}>
      <ContractHeader
        deliverableStatusClass={deliverableStatusClass}
        headerContent={headerContent}
      />
      <ContractParty role={role} user={userInfo} headerInfo={headerInfo} />
      <ContractSummary summary={summary} />
      <ContractTimeline
        // contractTimeline={contract?.contract_timelines}
        contractTimeline={contractTimeline} // for the test
      />
      <ContractDeliverables deliverables={deliverables} />
      <ContractPayments deliverables={deliverables} />
    </div>
  );
}

export default ContractDetail;
