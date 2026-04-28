import { NavLink } from "react-router-dom";
import styles from "../styles/ContractCard.module.css";
import profile from "../../../assets/images/profile.png";

function ContractCard({ contract }) {
  const statusClass = {
    active: "status-success",
    completed: "status-purple",
    cancelled: "status-danger",
  };

  return (
    <div className={styles.contractCard}>
      <div className={styles.contractCardLeft}>
        <div className={styles.contractCardHeader}>
          <div className={styles.contractCardHeaderLeft}>
            <img
              src={profile}
              className={styles.freelancerAvatar}
              alt="freelancer profile"
            />
            <div className={styles.contractCardHeaderTitleBox}>
              <h2 className={styles.projectTitle}>{contract.project_title}</h2>
              <p className={styles.freelancerName}>
                {contract.freelancer.first_name} {contract.freelancer.last_name}
                | Freelancer
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
                ${contract.final_price}
              </div>
            </div>
            <div className={styles.contractSubCard}>
              <h5 className={styles.contractSubCardTitle}>Progress</h5>
              <div
                className={`${styles.contractSubCardContent} ${styles.progress}`}
              >
                {contract.completed_deliverables} /{" "}
                {contract.total_deliverables}
              </div>
            </div>
          </div>

          {contract.status === "active" && (
            <div className={styles.contractInfos}>
              <div className={styles.contractInfoItem}>
                <p>Current livrable </p>{" "}
                <p>{contract.current_deliverable?.title}</p>
              </div>
              <div className={styles.contractInfoItem}>
                <p>Deliverable Deadline </p>
                <p> {contract.current_deliverable?.deadline} </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.contractCardRight}>
        <NavLink
          to={`${contract.id}`}
          className={`${styles.primaryBtn} ${styles.navlink}`}
        >
          View details
        </NavLink>
        <NavLink className={styles.navlink}>View delivrables</NavLink>
        <NavLink className={styles.navlink}>Message freelancer</NavLink>
      </div>
    </div>
  );
}

export default ContractCard;
