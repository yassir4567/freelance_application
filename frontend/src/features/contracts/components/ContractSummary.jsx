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
      label: t("contractDetail.overview.cards.budget"),
      value: formatCurrency(summary?.budget, "Not set"),
      icon: <FiDollarSign />,
    },
    {
      id: "deadline",
      label: t("contractDetail.overview.cards.deadline"),
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
        <p className={styles.kicker}>{t("contractDetail.overview.subTitle")}</p>
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
              <h3>{t("contractDetail.overview.description.title")}</h3>
            </div>
          </div>
          <p className={styles.summaryItemContent}>
            {valueOrFallback(
              summary?.description,
              "No contract description has been provided yet.",
            )}
          </p>
        </section>

        <section className={styles.progressCard}>
          <p className={styles.cardKicker}>
            {t("contractDetail.overview.progress.subTitle")}
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
            {formatCurrency(summary?.paidAmount)} released against{" "}
            {formatCurrency(summary?.budget, "not set")} total.
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
            {t("contractDetail.overview.contractFile.subTitle")}
          </p>
          <h3>{t("contractDetail.overview.contractFile.title")}</h3>
          <p>
            {summary?.contract_pdf
              ? t("contractDetail.overview.contractFile.description")
              : "No contract file has been attached yet."}
          </p>
        </div>

        {summary?.contract_pdf ? (
          <a href={summary.contract_pdf_url} target="_blank" rel="noreferrer">
            {t("contractDetail.overview.contractFile.view")}
          </a>
        ) : (
          <span className={styles.documentUnavailable}>Unavailable</span>
        )}
      </div>
    </div>
  );
}

export default ContractSummary;
