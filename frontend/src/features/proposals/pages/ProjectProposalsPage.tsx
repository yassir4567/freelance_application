import styles from "../styles/ProjectProposalsPage.module.css";
import { useParams } from "react-router-dom";
import ClientProposalCard from "../components/ClientProposalCard";
import { useTranslation } from "react-i18next";
import { proposalApi } from "../../../api/proposals/proposalApi";
import useClientProjectProposals from "../hooks/useClientProjectProposals";
import { useState } from "react";
import type { ClientProjectProposalType } from "../../../types/proposal.types";

function ProjectProposalsPage() {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const { proposals, isLoading, error, setProposals } =
    useClientProjectProposals(projectId!);
  const [isAccepting, setIsAccepting] = useState<number | null>(null);
  const [acceptingError, setAcceptingError] = useState<string>("");
  const [isRejecting, setIsRejecting] = useState<number | null>(null);
  const [rejectingError, setRejectingError] = useState<string>("");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const acceptFreelancerProposal = async (
    proposalId: number,
  ): Promise<void> => {
    setIsAccepting(proposalId);
    setAcceptingError("");
    const result = await proposalApi.accept<ClientProjectProposalType>(
      projectId!,
      proposalId,
    );
    setIsAccepting(null);
    if (!result.success || !result.data) {
      setAcceptingError(result.message || "Error in Accepting proposal");
      return;
    }

    const acceptedProposal = result.data;

    setProposals((prev: ClientProjectProposalType[]) =>
      prev.map((proposal: ClientProjectProposalType) => {
        return proposal.id == proposalId ? acceptedProposal : proposal;
      }),
    );
  };

  const rejectFreelancerProposal = async (
    proposalId: number,
  ): Promise<void> => {
    setIsRejecting(proposalId);
    setRejectingError("");
    const result = await proposalApi.reject<ClientProjectProposalType>(
      projectId!,
      proposalId,
    );
    setIsRejecting(null);
    if (!result.success || !result.data) {
      setRejectingError(result.message || "Error in rejecting proposal");
      return;
    }

    const rejectedProposal = result.data;

    setProposals((prev: ClientProjectProposalType[]) =>
      prev.map((proposal: ClientProjectProposalType) =>
        proposal.id === +proposalId ? rejectedProposal : proposal,
      ),
    );
  };

  return (
    <div className={styles.proposalsListPage}>
      {proposals.length === 0 ? (
        <div className={styles.noPorposals}>{t("ui.states.noProposals")}</div>
      ) : (
        <div className={styles.proposalsList}>
          {proposals.map((proposal: ClientProjectProposalType) => (
            <ClientProposalCard
              key={proposal.id}
              proposal={proposal}
              isAccepting={isAccepting == proposal.id}
              isRejecting={isRejecting == proposal.id}
              acceptFreelancerProposal={acceptFreelancerProposal}
              rejectFreelancerProposal={rejectFreelancerProposal}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectProposalsPage;
