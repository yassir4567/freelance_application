import { NavLink } from "react-router-dom";
import styles from "../styles/ContractCard.module.css";
import profile from "../../../assets/images/profile.png";
import { useAuth } from "../../../context/AuthContext";
import {
  CONTRACT_STATUS_CLASS,
  formatCurrency,
  formatDisplayDate,
  formatStatusLabel,
  getStatusClass,
  valueOrFallback,
} from "../utils/contractDisplay";

function ContractCard({ contract }) {
  const {
    user: { role },
  } = useAuth();

  const other_user = contract.freelancer ?? contract.client ?? {};

  const otherUserLabel = role === "client" ? "Freelancer" : "Client";
  const messagePath = contract.conversation?.id
    ? `/dashboard/${role}/messages?chat=${contract.conversation.id}`
    : `/dashboard/${role}/messages`;

  return (
    <div className={styles.contractCard}>
      <div className={styles.contractCardLeft}>
        <div className={styles.contractCardHeader}>
          <div className={styles.contractCardHeaderLeft}>
            <img src={profile} className={styles.avatar} alt="User profile" />
            <div className={styles.contractCardHeaderTitleBox}>
              <h2 className={styles.projectTitle}>
                {valueOrFallback(contract.project_title, "Untitled project")}
              </h2>
              <p className={styles.name}>
                {valueOrFallback(
                  `${other_user.first_name ?? ""} ${
                    other_user.last_name ?? ""
                  }`.trim(),
                  "Not assigned",
                )}{" "}
                |{otherUserLabel}
              </p>
            </div>
          </div>
          <div
            className={`${styles.contractStatus} ${getStatusClass(
              CONTRACT_STATUS_CLASS,
              contract.status,
            )}`}
          >
            {formatStatusLabel(contract.status)}
          </div>
        </div>

        {contract.status !== "pending" && (
          <div className={styles.contractMainContent}>
            <div className={styles.contractSubCardContainer}>
              <div className={styles.contractSubCard}>
                <h5 className={styles.contractSubCardTitle}>Budget</h5>
                <div className={styles.contractSubCardContent}>
                  {formatCurrency(contract.final_price, "Not set")}
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
                  <p>Current deliverable</p>
                  <p>{valueOrFallback(contract.current_deliverable?.title)}</p>
                </div>
                <div className={styles.contractInfoItem}>
                  <p>Deliverable deadline</p>
                  <p>
                    {formatDisplayDate(contract.current_deliverable?.deadline)}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.contractCardRight}>
        {contract.status !== "pending" ? (
          <>
            <NavLink
              to={`${contract.id}`}
              className={`${styles.primaryBtn} ${styles.navlink}`}
            >
              View details
            </NavLink>
            <NavLink
              to={`${contract.id}?tab=deliverables`}
              className={styles.navlink}
            >
              View deliverables
            </NavLink>
          </>
        ) : (
          <NavLink to={`/dashboard/client/contracts/${contract.id}/setup`} className={styles.navlink}>
            Active contract
          </NavLink>
        )}
        <NavLink to={messagePath} className={styles.navlink}>
          Message {otherUserLabel}
        </NavLink>
      </div>
    </div>
  );
}

export default ContractCard;
