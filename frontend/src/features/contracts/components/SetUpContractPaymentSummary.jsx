import styles from "../styles/SetUpContractPaymentSummary.module.css";

function SetUpContractPaymentSummary({ final_price, totalDeliverablesAmount }) {
  const remaining = Number(final_price) - Number(totalDeliverablesAmount) || 0;

  return (
    <div className={styles.summary}>
      <h1 className={styles.title}>Payment summary</h1>
      <div className={styles.container}>
        <p className={styles.box}>
          <span className={styles.label}>Final price</span>
          <span className={styles.price}>$ {final_price || 0}</span>
        </p>
        <p className={styles.box}>
          <span className={styles.label}>Allocated</span>
          <span className={styles.price}>$ {totalDeliverablesAmount || 0}</span>
        </p>
        <p className={styles.box}>
          <span className={styles.label}>Remaining</span>
          <span
            className={styles.price}
            style={{ color: remaining < 0 && "red" }}
          >
            $ {remaining}
          </span>
        </p>
      </div>
    </div>
  );
}

export default SetUpContractPaymentSummary;
