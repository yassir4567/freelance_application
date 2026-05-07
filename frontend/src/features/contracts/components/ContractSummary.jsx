import styles from "../styles/ContractSummary.module.css";
import {
  formatCurrency,
  formatDisplayDate,
  valueOrFallback,
} from "../utils/contractDisplay";
import { FiCalendar, FiCheckCircle, FiDollarSign, FiFileText } from "react-icons/fi";

function ContractSummary({ summary }) {
  const cards = [
    {
      id: "budget",
      label: "Budget",
      value: formatCurrency(summary?.budget, "Not set"),
      icon: <FiDollarSign />,
    },
    {
      id: "deadline",
      label: "Final deadline",
      value: formatDisplayDate(summary?.deadline),
      icon: <FiCalendar />,
    },
    {
      id: "deliverables",
      label: "Deliverables approved",
      value: `${summary?.completed_deliverables ?? 0}/${summary?.total_deliverables ?? 0}`,
      icon: <FiCheckCircle />,
    },
  ];

  return (
    <div className={styles.contractSummary}>
      <div className={styles.sectionHeader}>
        <p className={styles.kicker}>Overview</p>
        <h2 className={styles.subTitle}>Contract summary</h2>
      </div>

      <div className={styles.summaryGrid}>
        <section className={styles.descriptionCard}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
              <FiFileText />
            </div>
            <div>
              <p className={styles.cardKicker}>Agreement</p>
              <h3>Description</h3>
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
          <p className={styles.cardKicker}>Payment progress</p>
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
          <p className={styles.cardKicker}>Document</p>
          <h3>Contract file</h3>
          <p>
            {summary?.contract_pdf
              ? "The signed contract document is available."
              : "No contract file has been attached yet."}
          </p>
        </div>

        {summary?.contract_pdf ? (
          <a href={summary.contract_pdf} target="_blank" rel="noreferrer">
            View document
          </a>
        ) : (
          <span className={styles.documentUnavailable}>Unavailable</span>
        )}
      </div>
    </div>
  );
}

export default ContractSummary;
