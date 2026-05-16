import { useTranslation } from "react-i18next";
import styles from "../styles/ContractSummary.module.css";
import {
  formatCurrency,
  formatDisplayDate,
  valueOrFallback,
} from "../utils/contractDisplay";
import {
  FiCalendar,
  FiCheckCircle,
  FiDollarSign,
  FiFileText,
} from "react-icons/fi";

function ContractSummary({ summary }) {
  const { t } = useTranslation();
  const cards = [
    {
      id: "budget",
      label: t("common.labels.budget"),
      value: formatCurrency(summary?.budget, t("ui.fallbacks.notSet")),
      icon: <FiDollarSign />,
    },
    {
      id: "deadline",
      label: t("common.labels.finalDeadline"),
      value: formatDisplayDate(summary?.deadline),
      icon: <FiCalendar />,
    },
    {
      id: "deliverables",
      label: t("contractDetail.overview.cards.deliverablesApproved"),
      value: `${summary?.completed_deliverables ?? 0}/${summary?.total_deliverables ?? 0}`,
      icon: <FiCheckCircle />,
    },
  ];

  return (
    <div className={styles.contractSummary}>
      <div className={styles.sectionHeader}>
        <p className={styles.kicker}>{t("common.labels.overview")}</p>
        <h2 className={styles.subTitle}>
          {t("contractDetail.overview.title")}
        </h2>
      </div>

      <div className={styles.summaryGrid}>
        <section className={styles.descriptionCard}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
              <FiFileText />
            </div>
            <div>
              <p className={styles.cardKicker}>
                {t("contractDetail.overview.description.subTitle")}
              </p>
              <h3>{t("common.labels.description")}</h3>
            </div>
          </div>
          <p className={styles.summaryItemContent}>
            {valueOrFallback(
              summary?.description,
              t("ui.fallbacks.noContractDescription"),
            )}
          </p>
        </section>

        <section className={styles.progressCard}>
          <p className={styles.cardKicker}>
            {t("common.labels.paymentProgress")}
          </p>
          <div className={styles.progressValue}>
            {summary?.paymentProgress ?? 0}%
          </div>
          <div className={styles.progress_bar_container}>
            <div
              className={styles.progress_bar}
              style={{ width: `${summary?.paymentProgress ?? 0}%` }}
            ></div>
          </div>
          <p className={styles.progressCaption}>
            {t("contractDetail.overview.progressCaption.releasedAgainstTotal", {
              paid: formatCurrency(summary?.paidAmount),
              total: formatCurrency(summary?.budget, t("ui.fallbacks.notSet")),
            })}
          </p>
        </section>
      </div>

      <div className={styles.metricsGrid}>
        {cards.map((metric) => (
          <div key={metric.id} className={styles.metricCard}>
            <div className={styles.metricIcon}>{metric.icon}</div>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </div>
        ))}
      </div>

      <div className={styles.documentCard}>
        <div>
          <p className={styles.cardKicker}>
            {t("common.labels.document")}
          </p>
          <h3>{t("common.labels.contractFile")}</h3>
          <p>
            {summary?.contract_pdf
              ? t("contractDetail.overview.contractFile.description")
              : t("ui.fallbacks.noContractFile")}
          </p>
        </div>

        {summary?.contract_pdf ? (
          <a href={summary.contract_pdf_url} target="_blank" rel="noreferrer">
            {t("common.actions.viewDocument")}
          </a>
        ) : (
          <span className={styles.documentUnavailable}>{t("ui.fallbacks.documentUnavailable")}</span>
        )}
      </div>
    </div>
  );
}

export default ContractSummary;
