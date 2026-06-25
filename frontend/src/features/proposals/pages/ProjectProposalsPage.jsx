import styles from "../styles/ProjectProposalsPage.module.css";
import { useParams } from "react-router-dom";
import ClientProposalCard from "../components/ClientProposalCard";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { proposalApi } from "../../../api/proposals/proposalApi";

function ProposalsList() {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const loadProposals = async () => {
      const result = await proposalApi.getClientProjectProposals(projectId);
      setProposals(result.data);
    };
    loadProposals();
  }, []);

  const acceptFreelancerProposal = async (proposalId) => {
    const result = await proposalApi.accept(projectId, proposalId);
    if (result.success) {
      setProposals((prev) =>
        prev.map((proposal) =>
          proposal.id === proposalId ? result.data : proposal,
        ),
      );
    }
  };

  const rejectFreelancerProposal = async (proposalId) => {
    const result = await proposalApi.reject(projectId, proposalId);
    if (result.success) {
      setProposals((prev) =>
        prev.map((proposal) =>
          proposal.id === proposalId ? result.data : proposal,
        ),
      );
    }
  };

  return (
    <div className={styles.proposalsListPage}>
      {proposals?.length === 0 ? (
        <div className={styles.noPorposals}>{t("ui.states.noProposals")}</div>
      ) : (
        <div className={styles.proposalsList}>
          {proposals?.map((proposal) => (
            <ClientProposalCard
              key={proposal?.id}
              proposal={proposal}
              acceptFreelancerProposal={acceptFreelancerProposal}
              rejectFreelancerProposal={rejectFreelancerProposal}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProposalsList;
