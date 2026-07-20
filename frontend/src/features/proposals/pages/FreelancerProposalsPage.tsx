import styles from "../styles/FreelancerProposalsPage.module.css";
import { useSearchParams } from "react-router-dom";
import FreelancerProposalCard from "../components/FreelancerProposalCard";
import { useTranslation } from "react-i18next";
import useFreelancerProposals from "../hooks/useFreelancerProposals";
import type { ProposalStatus } from "../../../types/proposal.types";

const STATUS: (ProposalStatus | "all")[] = [
  "all",
  "pending",
  "accepted",
  "rejected",
];

function FreelancerProposalsPage() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams("");
  const { proposals, isLoading, error } = useFreelancerProposals(
    searchParams.toString(),
  );

  const selectedStatus = searchParams.get("status") || "all";

  const handleSelectStatus = (status: ProposalStatus | "all") => {
    if (status === selectedStatus) return;

    if (status === "all") {
      setSearchParams({});
      return;
    }

    setSearchParams({ status: status });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!proposals) return <p>No proposals founds</p>;

  return (
    <div className={styles.proposalsPage}>
      <div>
        <h1 className="pageTitle">{t("freelancerProposals.title")}</h1>
        <p className={styles.pageDescription}>
          {t("freelancerProposals.subTitle")}
        </p>
      </div>

      <div className={styles.filterBtnsContainer}>
        <p className={styles.totalProposals}>
          <span>{t("freelancerPropo!) resals.total")} :</span>
          {!isLoading && <span>{proposals.length}</span>}
        </p>
        <div className={styles.filterBtnsWrapper}>
          {STATUS.map((status: ProposalStatus | "all") => (
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
