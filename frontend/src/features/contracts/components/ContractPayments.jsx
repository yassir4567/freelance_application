import SimpleCard from "../../../shared/ui/SimpleCard";
import styles from "../styles/ContractPayments.module.css";

function ContractPayments({ deliverables }) {
  const paymentStatusClass = {
    released: "status-success",
    escrow: "status-info",
    pending: "status-warning",
    refunded: "status-danger",
  };

  deliverables = deliverables ?? [];

  const totalAmount = deliverables.reduce((acc, cur) => acc + +cur.amount, 0);

  const paidAmount = deliverables.reduce(
    (acc, cur) =>
      cur.payment?.status === "released" ? acc + +cur.payment?.amount : acc,
    0,
  );

  const escrowAmount = deliverables.reduce(
    (acc, cur) =>
      cur.payment?.status === "escrow" ? acc + +cur.payment?.amount : acc,
    0,
  );

  const pendingAmount = totalAmount - (paidAmount + escrowAmount);

  const paymentsCards = [
    {
      id: 1,
      title: "Total",
      value: totalAmount,
      className: styles.paymentCard,
    },
    {
      id: 2,
      title: "Paid out",
      value: paidAmount,
      className: `${styles.paymentCard} ${styles.paidOutCard}`,
    },
    {
      id: 3,
      title: "Escrow",
      value: escrowAmount,
      className: `${styles.paymentCard} ${styles.escrowCard}`,
    },
    {
      id: 4,
      title: "Pending",
      value: pendingAmount,
      className: `${styles.paymentCard} ${styles.remainingCard}`,
    },
  ];

  return (
    <div className={styles.paymentsSection}>
      <h2 className={styles.subTitle}>Payments</h2>
      <div className={styles.paymentsGrid}>
        <div className={styles.paymentsSubCards}>
          {paymentsCards.map((card) => (
            <SimpleCard
              key={card.id}
              title={card.title}
              value={card.value}
              className={card.className}
            />
          ))}
        </div>
        <div className={styles.paymentsList}>
          {deliverables?.map((deliverable) => (
            <div key={deliverable.id} className={styles.paymentItem}>
              <div className={styles.paymentItemLeft}>
                <h5 className={styles.paymentItemSubTitle}>
                  Deliverable Number #{deliverable.position}
                </h5>
                <h1 className={styles.paymentItemTitle}>{deliverable.title}</h1>
              </div>

              <div className={styles.paymentItemright}>
                <div
                  className={`${styles.paymentStatus} ${paymentStatusClass[deliverable.payment?.status ?? "pending"]}`}
                >
                  {deliverable.payment?.status ?? "pending"}
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
