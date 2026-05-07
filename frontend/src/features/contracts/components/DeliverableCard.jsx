import { Fragment, useState } from "react";
import styles from "../styles/DeliverableCard.module.css";
import DeliverableDetailModal from "./DeliverableDetailModal";
import { useAuth } from "../../../context/AuthContext";
import {
  DELIVERABLE_STATUS_CLASS,
  DELIVERABLE_STATUS_LABEL,
  formatCurrency,
  formatDisplayDate,
  formatStatusLabel,
  getStatusClass,
  valueOrFallback,
} from "../utils/contractDisplay";

function DeliverableCard({ deliverable }) {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { user } = useAuth();

  
  const role = user?.role;
  const statusLabel =
    DELIVERABLE_STATUS_LABEL[deliverable.status] ||
    formatStatusLabel(deliverable.status);

  return (
    <Fragment>
      <div className={styles.deliverableCard}>
        <div className={styles.deliverableHeader}>
          <h5 className={styles.deliverableNumber}>
            Deliverable <span>#{deliverable.position ?? deliverable.id}</span>
          </h5>
          <p
            className={`${styles.deliverableStatus} ${getStatusClass(
              DELIVERABLE_STATUS_CLASS,
              deliverable.status,
            )}`}
          >
            {statusLabel}
          </p>
        </div>

        <div className={styles.deliverableBody}>
          <div className={styles.deliverableSummary}>
            <h3 className={styles.deliverableTitle}>
              {valueOrFallback(deliverable.title, "Untitled deliverable")}
            </h3>
            <p className={styles.deliverableDescription}>
              {valueOrFallback(
                deliverable.description,
                "No description was provided for this deliverable.",
              )}
            </p>

            <div className={styles.deliverableMeta}>
              <span>{formatCurrency(deliverable.amount)}</span>
              <span>{formatDisplayDate(deliverable.deadline)}</span>
              <span>{deliverable.payment?.status || "payment pending"}</span>
            </div>
          </div>

          <div className={styles.deliverableAside}>
            <button
              type="button"
              className={styles.viewDetail}
              onClick={() => setIsDetailModalOpen(true)}
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      <DeliverableDetailModal
        deliverable={deliverable}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        statusLabel={DELIVERABLE_STATUS_LABEL}
        deliverableStatus={DELIVERABLE_STATUS_CLASS}
        userType={role}
      />
    </Fragment>
  );
}

export default DeliverableCard;
