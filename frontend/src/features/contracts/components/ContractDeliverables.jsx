import DeliverableCard from "./DeliverableCard";
import styles from "../styles/ContractDeliverables.module.css";
import SimpleCard from "../../../shared/ui/SimpleCard";
import { useTranslation } from "react-i18next";

function ContractDeliverables({ contract, setContract }) {
  const { t } = useTranslation();
  const safeDeliverables = contract.deliverables ?? [];

  const deliverable_stats_cards = [
    {
      id: 0,
      title: t("contractDetail.deliverables.stats.total"),
      value: safeDeliverables.length,
    },
    {
      id: 1,
      title: t("contractDetail.deliverables.stats.completed"),
      value: safeDeliverables.filter((del) => del.status === "accepted").length,
    },
    {
      id: 2,
      title: t("contractDetail.deliverables.stats.inReview"),
      value: safeDeliverables.filter((del) => del.status === "submitted")
        .length,
    },
    {
      id: 3,
      title: t("contractDetail.deliverables.stats.waiting"),
      value: safeDeliverables.filter((del) => del.status === "pending").length,
    },
  ];

  return (
    <div className={styles.deliverablesSection}>
      <div className={styles.sectionHeader}>
        <p className={styles.kicker}>
          {t("contractDetail.deliverables.subTitle")}
        </p>
        <h2 className={styles.subTitle}>
          {t("contractDetail.deliverables.title")}
        </h2>
        <p>{t("contractDetail.deliverables.description")}</p>
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
          safeDeliverables.map((deliverable, index) => (
            <DeliverableCard
              key={deliverable.id}
              index={index}
              deliverable={deliverable}
              deliverables={safeDeliverables}
              contract={contract}
              setContract={setContract}
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
