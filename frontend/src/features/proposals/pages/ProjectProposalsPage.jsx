import styles from "../styles/ProjectProposalsPage.module.css";
import { useParams } from "react-router-dom";
import ProposalCard from "../components/ProposalCard";
import { useEffect, useState } from "react";
import { getClientProjectProposals } from "../../../api/proposals/getClientProjectProposals";

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

  return (
    <div className={styles.proposalsListPage}>
      {proposals?.length === 0 ? (
        <div className={styles.noPorposals}>No proposals</div>
      ) : (
        <div className={styles.proposalsList}>
          {proposals?.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProposalsList;
