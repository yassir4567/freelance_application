import styles from "../styles/ContractHeader.module.css";
import { NavLink } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import {
  formatCurrency,
  formatStatusLabel,
  getStatusClass,
} from "../utils/contractDisplay";

function ContractHeader({ statusClass, headerContent, role }) {
  const title = headerContent.projectTitle || "Untitled contract";
  const totalDeliverables = headerContent.totalDeliverables || 0;
  const completedDeliverables = headerContent.completedDeliverables || 0;

  return (
    <div className={styles.contractDetailHeader}>
      <div className={styles.heroGlow}></div>
      <div className={styles.headerTop}>
        <NavLink to={`/dashboard/${role}/contracts`} className={styles.backLink}>
          <FiArrowLeft />
          <span>Back to contracts</span>
        </NavLink>

        <div
          className={`${styles.status} ${getStatusClass(statusClass, headerContent.status)}`}
        >
          {formatStatusLabel(headerContent.status, "Draft")}
        </div>
      </div>

      <div className={styles.headerContent}>
        <div className={styles.headerLeft}>
          <p className={styles.eyebrow}>Contract workspace</p>
          <h1 className={styles.headerTitle}>{title}</h1>
          <p className={styles.headerSubtitle}>
            Review the agreement, track deliverables, and keep escrow status
            visible without hunting through the page.
          </p>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.budgetCard}>
            <span>Total budget</span>
            <strong>{formatCurrency(headerContent.budget, "Not set")}</strong>
          </div>

          <div className={styles.progressCard}>
            <div className={styles.progressTop}>
              <span>Deliverables</span>
              <strong>
                {completedDeliverables}/{totalDeliverables}
              </strong>
            </div>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressBar}
                style={{ width: `${headerContent.progress || 0}%` }}
              ></div>
            </div>
            <p>{headerContent.progress || 0}% complete</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContractHeader;
