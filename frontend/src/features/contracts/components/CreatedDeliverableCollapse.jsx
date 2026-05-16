import { useState } from "react";
import styles from "../styles/CreatedDeliverableCollapse.module.css";
import { MdPlayArrow } from "react-icons/md";
import { useTranslation } from "react-i18next";

function CreatedDeliverableCollapse({
  deliverable,
  index,
  handleRemoveDeliverable,
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

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
          <p>{t("common.labels.deliverable")} #{index + 1}</p>
        </div>
        <button
          onClick={() => handleRemoveDeliverable(index)}
          className={styles.remove}
        >
          {t("ui.actions.remove")}
        </button>
      </div>
      {open && (
        <div className={styles.collapseDetail}>
          <div className={styles.box}>
            <p>{t("common.labels.title")} </p>
            <p>{deliverable.title}</p>
          </div>
          <div className={styles.box}>
            <p>{t("common.labels.amount")} </p>
            <p>${deliverable.amount}</p>
          </div>
          <div className={styles.box}>
            <p>{t("common.labels.description")} </p>
            <p>{deliverable.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatedDeliverableCollapse;
