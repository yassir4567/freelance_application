import SimpleCard from "../../../shared/ui/SimpleCard";
import styles from "../styles/ContractPayments.module.css";

function ContractPayments({ deliverables }) {
  const paymentStatusClass = {
    released: "status-success",
    escrow: "status-info",
    pending: "status-warning",
    refunded: "status-danger",
  };
  return (
    <div className={styles.paymentsSection}>
      <h2 className={styles.subTitle}>Payments</h2>
      <div className={styles.paymentsGrid}>
        <div className={styles.paymentsSubCards}>
          <SimpleCard
            title="Total"
            value="$900"
            className={styles.paymentCard}
          />
          <SimpleCard
            title="Paid out"
            value="$900"
            className={`${styles.paymentCard} ${styles.paidOutCard}`}
          />
          <SimpleCard
            title="Escrow"
            value="$900"
            className={`${styles.paymentCard} ${styles.escrowCard}`}
          />
          <SimpleCard
            title="Remaining"
            value="$900"
            className={`${styles.paymentCard} ${styles.remainingCard}`}
          />
        </div>
        <div className={styles.paymentsList}>
          {deliverables.map((deliverable) => (
            <div key={deliverable.id} className={styles.paymentItem}>
              <div className={styles.paymentItemLeft}>
                <h5 className={styles.paymentItemSubTitle}>
                  Deliverable Number #{deliverable.id}
                </h5>
                <h1 className={styles.paymentItemTitle}>{deliverable.title}</h1>
              </div>

              <div className={styles.paymentItemright}>
                <div
                  className={`${styles.paymentStatus} ${paymentStatusClass[deliverable.payment_status]}`}
                >
                  {deliverable.payment_status}
                </div>
                <div className={styles.amount}>${deliverable.amount}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContractPayments;
