import styles from "../styles/ContractHeader.module.css";
function ContractHeader({deliverableStatusClass}) {
  return (
    <div className={styles.contractDetailHeader}>
      <div className={styles.headerLeft}>
        <div
          className={`${deliverableStatusClass["cancelled"]} ${styles.status}`}
        >
          Cancelled
        </div>
        <h1 className={styles.headerTitle}>
          E-Commerce Platform Redesign & Development
        </h1>
      </div>
      <div className={styles.headerRight}>
        <div className={styles.totalBudget}>$6200</div>
        <p>Total Budget</p>
      </div>
    </div>
  );
}

export default ContractHeader;
