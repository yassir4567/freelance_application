import styles from "../styles/ProjectProposalsPage.module.css";
import { proposals } from "../api/proposals";
import { useParams } from "react-router-dom";
import ProposalCard from "../components/ProposalCard";

function ProposalsList() {
  const { projectId } = useParams();

  const projectProposals = proposals.filter(
    (proposal) => proposal.projectId === +projectId,
  );

  return (
    <div className={styles.proposalsListPage}>
      {projectProposals.length === 0 ? (
        <div className={styles.noPorposals}>No proposals</div>
      ) : (
        <div className={styles.proposalsList}>
          {projectProposals.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProposalsList;
