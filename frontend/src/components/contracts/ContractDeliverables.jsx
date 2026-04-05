import DeliverableCard from "../cards/DeliverableCard";
import styles from "./ContractDeliverables.module.css";

function ContractDeliverables({deliverables}) {


  return (
    <div className={styles.deliverablesSection}>
      <h2 className={styles.subTitle}>Project Deliverables</h2>
      <div className={styles.deliverablesQuickInfo}>
        <p>Total deliverables : 4 </p> |<p>Completed : 1</p> |
        <p>Submitted : 1</p> |<p>Pending : 2</p>
      </div>
      <div className={styles.deliverablesList}>
        {deliverables.map((deliverable) => (
          <DeliverableCard key={deliverable.id} deliverable={deliverable} />
        ))}
      </div>
    </div>
  );
}

export default ContractDeliverables;
