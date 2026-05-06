import styles from "../styles/ProjectProposalsPage.module.css";
import { useParams } from "react-router-dom";
import ClientProposalCard from "../components/ClientProposalCard";
import { useEffect, useState } from "react";
import { getClientProjectProposals } from "../../../api/proposals/getClientProjectProposals";
import { acceptProposal } from "../../../api/proposals/acceptProposal";
import { rejectProposal } from "../../../api/proposals/rejectProposal";

function ProposalsList() {
  const { projectId } = useParams();
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const loadProposals = async () => {
      const result = await getClientProjectProposals(projectId);
      setProposals(result.data);
    };
    loadProposals();
  }, []);

  const acceptFreelancerProposal = async (proposalId) => {
    const result = await acceptProposal(projectId, proposalId);
    if (result.success) {
      setProposals((prev) =>
        prev.map((proposal) =>
          proposal.id === proposalId ? result.data : proposal,
        ),
      );
    }
  };

  const rejectFreelancerProposal = async (proposalId) => {
    const result = await rejectProposal(projectId, proposalId);
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
        <div className={styles.noPorposals}>No proposals</div>
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
