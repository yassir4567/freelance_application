import { useEffect, useState } from "react";
import styles from "../styles/FreelancerContractsPage.module.css";
import { getFreelancerContractStats } from "../../../api/contracts/getFreelancerContractStats";
import SimpleCard from "../../../shared/ui/SimpleCard";

function FreelancerContractsPage() {
  const [contractStats, setContractStats] = useState([]);

  useEffect(() => {
    const loadContractStats = async () => {
      const result = await getFreelancerContractStats();
      console.log(result.data);
      
      setContractStats(result.data);
    };
    loadContractStats();
  }, []);

  // * overview cards
  const overviewCards = [
    {
      id: 0,
      title: "Completed Contracts",
      total: contractStats?.completed_contracts || "__",
      subTitle: "all time"
    },
    {
      id: 2,
      title: "Active Contracts",
      total: contractStats?.active_contracts || "__",
      subTitle: "Currently running",
    },
    {
      id: 1,
      title: "Total Earnings",
      total: `$${contractStats?.total_earnings?.toFixed(3)}` || "__",
      subTitle: "across all contracts",
    },
  ];

  return (
    <div className={styles.contractsPage}>
      <div className={styles.pageHeader}>
        <h1 className="pageTitle">My Contracts</h1>
        <p className={styles.contractsPageSubTitle}>
          Track negotiations, active work, and completed agreements in one
          place.
        </p>
      </div>

      <div className={styles.overviewSection}>
        <h2 className={styles.overviewTitle}>Overview</h2>
        <div className={styles.contractsOverview}>
          {overviewCards.map((ov) => (
            <SimpleCard
              key={ov.id}
              title={ov.title}
              value={ov.total}
              description={ov.subTitle}
              className={styles.contractsOverviewCard}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FreelancerContractsPage;
