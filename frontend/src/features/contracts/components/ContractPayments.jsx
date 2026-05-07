import SimpleCard from "../../../shared/ui/SimpleCard";
import styles from "../styles/ContractPayments.module.css";
import {
  formatCurrency,
  formatStatusLabel,
  getStatusClass,
  PAYMENT_STATUS_CLASS,
  valueOrFallback,
} from "../utils/contractDisplay";

function ContractPayments({ deliverables, paymentSummary }) {
  const safeDeliverables = deliverables ?? [];

  const paymentsCards = [
    {
      id: 1,
      title: "Total",
      value: formatCurrency(paymentSummary?.totalAmount),
      className: styles.paymentCard,
    },
    {
      id: 2,
      title: "Paid out",
      value: formatCurrency(paymentSummary?.paidAmount),
      className: `${styles.paymentCard} ${styles.paidOutCard}`,
    },
    {
      id: 3,
      title: "Escrow",
      value: formatCurrency(paymentSummary?.escrowAmount),
      className: `${styles.paymentCard} ${styles.escrowCard}`,
    },
    {
      id: 4,
      title: "Pending",
      value: formatCurrency(paymentSummary?.pendingAmount),
      className: `${styles.paymentCard} ${styles.remainingCard}`,
    },
  ];

  return (
    <div className={styles.paymentsSection}>
      <div className={styles.sectionHeader}>
        <p className={styles.kicker}>Escrow</p>
        <h2 className={styles.subTitle}>Payment status</h2>
        <p>
          See what is funded, what has been released, and which deliverables are
          still waiting on escrow.
        </p>
      </div>

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
          {safeDeliverables.length ? (
            safeDeliverables.map((deliverable) => {
              const paymentStatus = deliverable.payment?.status ?? "pending";

              return (
                <div key={deliverable.id} className={styles.paymentItem}>
                  <div className={styles.paymentItemLeft}>
                    <h5 className={styles.paymentItemSubTitle}>
                      Deliverable #{deliverable.position ?? deliverable.id}
                    </h5>
                    <h1 className={styles.paymentItemTitle}>
                      {valueOrFallback(
                        deliverable.title,
                        "Untitled deliverable",
                      )}
                    </h1>
                  </div>

                  <div className={styles.paymentItemRight}>
                    <div
                      className={`${styles.paymentStatus} ${getStatusClass(
                        PAYMENT_STATUS_CLASS,
                        paymentStatus,
                      )}`}
                    >
                      {formatStatusLabel(paymentStatus)}
                    </div>
                    <div className={styles.amount}>
                      {formatCurrency(
                        deliverable.payment?.amount ?? deliverable.amount,
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.emptyState}>
              No payment records are available for this contract yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContractPayments;
