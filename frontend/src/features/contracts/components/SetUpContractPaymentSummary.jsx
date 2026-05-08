import styles from "../styles/SetUpContractPaymentSummary.module.css";

function SetUpContractPaymentSummary({ final_price }) {
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
          <span className={styles.price}> $ 0</span>
        </p>
        <p className={styles.box}>
          <span className={styles.label}>Remaining</span>
          <span className={styles.price}> $ 0</span>
        </p>
      </div>
    </div>
  );
}

export default SetUpContractPaymentSummary;
