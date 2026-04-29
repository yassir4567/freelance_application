import { formatDate } from "../../../utils/helpers";
import styles from "../styles/ContractSummary.module.css";

function ContractSummary({ summary }) {
  const paid = summary?.payments?.reduce(
    (acc, cur) => (cur.status == "released" ? acc + +cur.amount : acc),
    0,
  );

  const budget = +summary?.budget || 0;

  const paymentProgress = budget > 0 ? Math.round((paid / budget) * 100) : 0;

  return (
    <div className={styles.contractSummary}>
      <h2 className={styles.subTitle}>Contract Summary</h2>
      <div className={styles.summaryCard}>
        <div className={styles.summaryRowGrid}>
          <div className={styles.summaryDescription}>
            <h5 className={styles.summaryItemMinTitle}>Description</h5>
            <p className={styles.summaryItemContent}>{summary.description}</p>
          </div>
          <div>
            <h5 className={styles.summaryItemMinTitle}>Agreed Terms</h5>
            <div className={styles.agreedTerms}>
              <ul>
                <li>💰 Final price: ${budget}</li>
                <li>📅 Final deadline: {formatDate(summary.deadline)}</li>
                <li>📦 Number of deliverables: {summary.total_deliverables}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.summaryCardGrid}>
          <div>
            <h5 className={styles.summaryItemMinTitle}>Quick info</h5>
            <div className={styles.quickInfoItems}>
              <div className={styles.quickInfoItem}>
                <span>Completed deliverables :</span>
                <span> {summary.completed_deliverables}</span>
              </div>

              <div className={styles.quickInfoItem}>
                <span>Paid :</span>
                <span> ${paid}</span>
              </div>
              <div className={styles.progress_container}>
                <p className={styles.quickProgress}>Payment Progress : </p>
                <div className={styles.progress_bar_container}>
                  <div className={styles.progress_bar} style={{width : `${paymentProgress}%`}}></div>
                </div>
                <p className={styles.cmp}>{paymentProgress}% completed</p>
              </div>
            </div>
          </div>

          <div className={styles.contractFiles}>
            <h5 className={styles.summaryItemMinTitle}>Contract Document</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContractSummary;
