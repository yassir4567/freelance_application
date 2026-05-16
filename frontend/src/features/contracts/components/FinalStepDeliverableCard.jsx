import { useTranslation } from "react-i18next";
import styles from "../styles/FinalStepDeliverableCard.module.css";

function FinalStepDeliverableCard({ deliverable, index }) {
  const { t } = useTranslation();
  return (
    <div className={styles.card}>
      <h4 className={styles.title}>{t("common.labels.deliverable")} #{index + 1} </h4>
      <div className={styles.row}>
        <div className={styles.subCard}>
          <h5 className={styles.cardTitle}>
            {t("common.labels.title")}
          </h5>
          <p>{deliverable.title}</p>
        </div>
        <div className={styles.subCard}>
          <h5 className={styles.cardTitle}>
            {t("common.labels.amount")}
          </h5>
          <p>${deliverable.amount}</p>
        </div>
      </div>
      <div className={styles.subCard}>
        <h5 className={styles.cardTitle}>
          {t("common.labels.description")}
        </h5>
        <p>{deliverable.description}</p>
      </div>
    </div>
  );
}

export default FinalStepDeliverableCard;
