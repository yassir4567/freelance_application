import { NavLink } from "react-router-dom";
import styles from "../styles/ContractCard.module.css";
import profile from "../../../assets/images/profile.png";
import { useAuth } from "../../../context/AuthContext";

function ContractCard({ contract }) {
  const {
    user: { role },
  } = useAuth();

  const statusClass = {
    pending: "status-warning",
    active: "status-success",
    completed: "status-purple",
    cancelled: "status-danger",
  };

  let other_user = contract.freelancer ?? contract.client;

  console.log(contract);

  return (
    <div className={styles.contractCard}>
      <div className={styles.contractCardLeft}>
        <div className={styles.contractCardHeader}>
          <div className={styles.contractCardHeaderLeft}>
            <img src={profile} className={styles.avatar} alt="User profile" />
            <div className={styles.contractCardHeaderTitleBox}>
              <h2 className={styles.projectTitle}>{contract.project_title}</h2>
              <p className={styles.name}>
                {other_user.first_name} {other_user.last_name}|
                {role === "client" ? "Freelancer" : "Client"}
              </p>
            </div>
          </div>
          <div
            className={`${styles.contractStatus} ${statusClass[contract.status]}`}
          >
            {contract.status}
          </div>
        </div>

        {contract.status !== "pending" && (
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
        )}
      </div>

      <div className={styles.contractCardRight}>
        {contract.status !== "pending" && (
          <>
            <NavLink
              to={`${contract.id}`}
              className={`${styles.primaryBtn} ${styles.navlink}`}
            >
              View details
            </NavLink>
            <NavLink className={styles.navlink}>View delivrables</NavLink>
          </>
        )}
        <NavLink
          to={`/dashboard/client/messages?chat=${contract.conversation.id}`}
          className={styles.navlink}
        >
          Message freelancer
        </NavLink>
      </div>
    </div>
  );
}

export default ContractCard;
