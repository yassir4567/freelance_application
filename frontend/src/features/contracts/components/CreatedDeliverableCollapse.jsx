import { useState } from "react";
import styles from "../styles/CreatedDeliverableCollapse.module.css";
import { MdPlayArrow } from "react-icons/md";

function CreatedDeliverableCollapse({
  deliverable,
  index,
  handleRemoveDeliverable,
}) {
  const [open, setOpen] = useState(true);

  const handleToggleDetail = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.deliverableContainer}>
      <div className={styles.header}>
        <div onClick={handleToggleDetail} className={styles.leftSide}>
          <MdPlayArrow
            className={`${styles.arrow} ${open && styles.toBottom}`}
          />
          <p>Deliverable #{index + 1}</p>
        </div>
        <button
          onClick={() => handleRemoveDeliverable(index)}
          className={styles.remove}
        >
          Remove
        </button>
      </div>
      {open && (
        <div className={styles.collapseDetail}>
          <div className={styles.box}>
            <p>Title </p>
            <p>{deliverable.title}</p>
          </div>
          <div className={styles.box}>
            <p>Amount </p>
            <p>${deliverable.amount}</p>
          </div>
          <div className={styles.box}>
            <p>Description </p>
            <p>{deliverable.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatedDeliverableCollapse;
