import DeliverableCard from "./DeliverableCard";
import styles from "../styles/ContractDeliverables.module.css";
import SimpleCard from "../../../shared/ui/SimpleCard";

function ContractDeliverables({ deliverables }) {
  const deliverable_stats_cards = [
    {
      id: 0,
      title: "Total deliverables",
      value: deliverables?.length,
    },
    {
      id: 1,
      title: "Completed",
      value: deliverables?.filter((del) => del.status === "accepted").length,
    },
    {
      id: 4,
      title: "Pending",
      value: deliverables?.filter((del) => del.status === "pending").length,
    },
  ];

  return (
    <div className={styles.deliverablesSection}>
      <h2 className={styles.subTitle}>Project Deliverables</h2>
      <div className={styles.deliverablesQuickInfo}>
        {deliverable_stats_cards.map((card) => (
          <SimpleCard key={card.id} title={card.title} value={card.value} />
        ))}
      </div>
      <div className={styles.deliverablesList}>
        {deliverables?.map((deliverable) => (
          <DeliverableCard key={deliverable.id} deliverable={deliverable} />
        ))}
      </div>
    </div>
  );
}

export default ContractDeliverables;
