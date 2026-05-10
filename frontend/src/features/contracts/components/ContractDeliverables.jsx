import DeliverableCard from "./DeliverableCard";
import styles from "../styles/ContractDeliverables.module.css";
import SimpleCard from "../../../shared/ui/SimpleCard";

function ContractDeliverables({ deliverables }) {
  const safeDeliverables = deliverables ?? [];

  const deliverable_stats_cards = [
    {
      id: 0,
      title: "Total deliverables",
      value: safeDeliverables.length,
    },
    {
      id: 1,
      title: "Completed",
      value: safeDeliverables.filter((del) => del.status === "accepted").length,
    },
    {
      id: 2,
      title: "In review",
      value: safeDeliverables.filter((del) => del.status === "submitted")
        .length,
    },
    {
      id: 3,
      title: "Waiting",
      value: safeDeliverables.filter((del) => del.status === "pending").length,
    },
  ];

  return (
    <div className={styles.deliverablesSection}>
      <div className={styles.sectionHeader}>
        <p className={styles.kicker}>Milestones</p>
        <h2 className={styles.subTitle}>Project deliverables</h2>
        <p>
          Follow each milestone from waiting state through submission, review,
          and approval.
        </p>
      </div>

      <div className={styles.deliverablesQuickInfo}>
        {deliverable_stats_cards.map((card) => (
          <SimpleCard
            key={card.id}
            title={card.title}
            value={card.value}
            className={styles.statCard}
          />
        ))}
      </div>

      <div className={styles.deliverablesList}>
        {safeDeliverables.length ? (
          safeDeliverables.map((deliverable , index) => (
            <DeliverableCard
              key={deliverable.id}
              index={index}
              deliverable={deliverable}
              deliverables={safeDeliverables}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            No deliverables have been added to this contract yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default ContractDeliverables;
