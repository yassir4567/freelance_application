import { useEffect, useState } from "react";
import styles from "../styles/FreelancerProposalsPage.module.css";
import { getFreelancerProposals } from "../../../api/proposals/getFreelancerProposals";
import { useSearchParams } from "react-router-dom";
import FreelancerProposalCard from "../components/FreelancerProposalCard";
function FreelancerProposalsPage() {
  const [proposals, setProposals] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams("");
  const [isLoading, setIsLoading] = useState(false);

  const selectedStatus = searchParams.get("status") || "all";

  useEffect(() => {
    const loadProposals = async () => {
      setIsLoading(true);
      const result = await getFreelancerProposals(searchParams.toString());
      setProposals(result.data || []);
      setIsLoading(false);
    };
    loadProposals();
  }, [searchParams]);

  const handleSelectStatus = (status) => {
    if (status === selectedStatus) return;

    if (status === "all") {
      setSearchParams({});
      return;
    }

    setSearchParams({ status: status });
  };

  return (
    <div className={styles.proposalsPage}>
      <div>
        <h1 className="pageTitle">My proposals</h1>
        <p className={styles.pageDescription}>
          Track and manage your proposals
        </p>
      </div>

      <div className={styles.filterBtnsContainer}>
        <p className={styles.totalProposals}>
          <span>
            Total {selectedStatus !== "all" && selectedStatus} proposals :
          </span>
          {!isLoading && <span>{proposals.length}</span>}
        </p>
        <div className={styles.filterBtnsWrapper}>
          {["all", "pending", "accepted", "rejected"].map((status) => (
            <div
              key={status}
              className={`${styles.statusBtn} ${styles[status]} ${selectedStatus === status ? styles.active : ""}`}
              onClick={() => handleSelectStatus(status)}
            >
              {status}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.proposalsCards}>
        {proposals.map((proposal) => (
          <FreelancerProposalCard key={proposal.id} proposal={proposal} />
        ))}
      </div>
    </div>
  );
}

export default FreelancerProposalsPage;
