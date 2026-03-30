import { NavLink } from "react-router-dom";
import styles from "./ContractCard.module.css";


function ContractCard({ contract }) {
  const nextActions = [
    "Continue negotiation",
    "Fund deliverable",
    "Review Deliverable",
    "Waiting for freelancer",
    "Leave feedback",
  ];

  const statusClass = {
    pending: styles.pending,
    active: styles.active,
    completed: styles.completed,
    rejected: styles.rejected,
    cancelled: styles.cancelled,
  };

  return (
    <div className={styles.contractCard}>
      <div className={styles.contractCardLeft}>
        <div className={styles.contractCardHeader}>
          <div className={styles.contractCardHeaderLeft}>
            <img
              src={contract.avatar}
              className={styles.freelancerAvatar}
              alt="freelancer profile"
            />
            <div className={styles.contractCardHeaderTitleBox}>
              <h2 className={styles.projectTitle}>{contract.projectTitle}</h2>
              <p className={styles.freelancerName}>
                {contract.freelancerName} | Freelancer
              </p>
            </div>
          </div>
          <div
            className={`${styles.contractStatus} ${statusClass[contract.status]}`}
          >
            {contract.status}
          </div>
        </div>

        <div className={styles.contractMainContent}>
          <div className={styles.contractSubCardContainer}>
            <div className={styles.contractSubCard}>
              <h5 className={styles.contractSubCardTitle}>Budget</h5>
              <div className={styles.contractSubCardContent}>
                ${contract.budget}
              </div>
            </div>
            <div className={styles.contractSubCard}>
              <h5 className={styles.contractSubCardTitle}>Progress</h5>
              <div
                className={`${styles.contractSubCardContent} ${styles.progress}`}
              >
                {contract.completedDelivrables} / {contract.deliverablesCount}
              </div>
            </div>
            <div className={styles.contractSubCard}>
              <h5 className={styles.contractSubCardTitle}>
                Delivrable Payment
              </h5>
              <div className={styles.contractSubCardContent}>Escrow</div>
            </div>
          </div>

          <div className={styles.contractInfos}>
            <div className={styles.contractInfoItem}>
              <p>Current livrable </p> <p>Dashboard UI/UX</p>
            </div>
            <div className={styles.contractInfoItem}>
              <p>Deliverable Deadline </p>
              <p> {contract.deliverableDeadline} </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contractCardRight}>
        <button className={`${styles.actionBtn} ${styles.primaryBtn}`}>
          <NavLink className={styles.navlink}>View details</NavLink>
        </button>
        <button className={`${styles.actionBtn}`}>
          <NavLink className={styles.navlink}>View delivrables</NavLink>
        </button>
        <button className={`${styles.actionBtn}`}>
          <NavLink className={styles.navlink}>Message freelancer</NavLink>
        </button>
      </div>
    </div>
  );
}

export default ContractCard;
