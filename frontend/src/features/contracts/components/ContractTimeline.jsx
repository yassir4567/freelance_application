import styles from "../styles/ContractTimeline.module.css";

function ContractTimeline({ contractTimeline }) {
  return (
    <div className={styles.timelineSection}>
      <div className={styles.timelineHeader}>
        <div>
          <p className={styles.timelineEyebrow}>Contract activity</p>
          <h3 className={styles.timelineTitle}>Timeline</h3>
        </div>
        <p className={styles.timelineHeaderNote}>
          Latest project deliverables and payment-related progress.
        </p>
      </div>

      <div className={styles.timelineBox}>
        <div className={styles.timelineList}>
          {contractTimeline.map((item) => (
            <div key={item.id} className={styles.timelineItem}>
              <div className={`${styles.timelineMarker}`} />
              <div className={styles.timelineDateBlock}>
                <p className={styles.timelineDate}>{item.date}</p>
                <span className={styles.timelineLabel}>{item.label}</span>
              </div>
              <div className={styles.timelineCard}>
                <h4 className={styles.timelineItemTitle}>{item.title}</h4>
                <p className={styles.timelineDescription}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContractTimeline;
