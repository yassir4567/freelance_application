import styles from "../styles/ContractHeader.module.css";
function ContractHeader({ deliverableStatusClass, headerContent }) {
  return (
    <div className={styles.contractDetailHeader}>
      <div className={styles.headerLeft}>
        <div
          className={`${deliverableStatusClass[headerContent.status]} ${styles.status}`}
        >
          {headerContent.status}
        </div>
        <h1 className={styles.headerTitle}>{headerContent.project_title}</h1>
      </div>
      <div className={styles.headerRight}>
        <div className={styles.totalBudget}>${headerContent.budget}</div>
        <p>Total Budget</p>
      </div>
    </div>
  );
}

export default ContractHeader;
