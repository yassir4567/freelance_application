import styles from "./ContractSummary.module.css";

function ContractSummary() {
  return (
    <div className={styles.contractSummary}>
      <h2 className={styles.subTitle}>Contract Summary</h2>
      <div className={styles.summaryCard}>
        <div className={styles.summaryRowGrid}>
          <div className={styles.summaryDescription}>
            <h5 className={styles.summaryItemMinTitle}>Description</h5>
            <p className={styles.summaryItemContent}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              rerum in molestiae doloribus nobis recusandae eos incidunt esse?
              Consequatur perferendis doloremque magni nihil assumenda modi
              velit? Laborum, cumque perferendis dolor culpa sequi ipsa odio
              magni mollitia libero! Beatae repudiandae, veniam dolorum ut in a,
              sed ab unde sint officia perferendis. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Rerum minima voluptatum nisi eaque
              pariatur! Accusantium corporis ab voluptates voluptas inventore?
            </p>
          </div>
          <div className={styles.summaryScope}>
            <h5 className={styles.summaryItemMinTitle}>Scope</h5>
            <p className={styles.summaryItemContent}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              rerum in molestiae doloribus nobis recusandae eos incidunt esse?
              Consequatur perferendis doloremque magni nihil assumenda modi
              velit? Laborum, cumque perferendis dolor culpa sequi ipsa odio
              magni mollitia libero! Beatae repudiandae.
            </p>
          </div>
        </div>

        <div className={styles.summaryCardGrid}>
          <div>
            <h5 className={styles.summaryItemMinTitle}>Agreed Terms</h5>
            <div className={styles.agreedTerms}>
              <ul>
                <li>💰 Final price: $6200</li>
                <li>📅 Final deadline: Feb 14, 2026</li>
                <li>📦 Number of deliverables: 5</li>
              </ul>
            </div>
          </div>

          <div>
            <h5 className={styles.summaryItemMinTitle}>Quick info</h5>
            <div className={styles.quickInfoItems}>
              <div className={styles.quickInfoItem}>
                <span>Completed deliverables :</span>
                <span> 2</span>
              </div>
              
              <div className={styles.quickInfoItem}>
                <span>Paid :</span>
                <span> $2400</span>
              </div>
              <div className={styles.progress_container}>
                <p className={styles.quickProgress}>Payment Progress : </p>
                <div className={styles.progress_bar_container}>
                  <div className={styles.progress_bar}></div>
                </div>
                <p className={styles.cmp}>20% completed</p>
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
