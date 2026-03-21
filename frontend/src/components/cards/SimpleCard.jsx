import styles from "./SimpleCard.module.css";

function SimpleCard({ title, total, children }) {
  return (
    <div className={styles.stateCard}>
      <p>
        <span className={styles.icon}>{children} </span>
        <span className={styles.cardTitle}>{title}</span>
      </p>
      <p className="total">{total}</p>
    </div>
  );
}

export default SimpleCard;
