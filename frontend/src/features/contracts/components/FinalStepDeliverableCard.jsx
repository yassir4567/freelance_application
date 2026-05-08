import styles from "../styles/FinalStepDeliverableCard.module.css";

function FinalStepDeliverableCard({ deliverable , index }) {
  return (
    <div className={styles.card}>
      <h4 className={styles.title}>Deliverable #{index + 1} </h4>
      <div className={styles.row}>
        <div className={styles.subCard}>
          <h5 className={styles.cardTitle}>Title</h5>
          <p>{deliverable.title}</p>
        </div>
        <div className={styles.subCard}>
          <h5 className={styles.cardTitle}>Amount</h5>
          <p>{deliverable.amount}</p>
        </div>
      </div>
      <div className={styles.subCard}>
        <h5 className={styles.cardTitle}>Description</h5>
        <p>{deliverable.description}</p>
      </div>
    </div>
  );
}

export default FinalStepDeliverableCard;
