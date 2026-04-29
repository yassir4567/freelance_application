import { Fragment, useState } from "react";
import styles from "../styles/DeliverableCard.module.css";
import DeliverableDetailModal from "./DeliverableDetailModal";
import { useAuth } from "../../../context/AuthContext";

function DeliverableCard({ deliverable }) {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { user } = useAuth();

  const deliverableStatus = {
    pending: "status-accent",
    submitted: "status-info",
    accepted: "status-success",
    unlocked: "status-purple",
    revision_request: "status-warning",
    cancelled: "status-danger",
  };

  const statusLabel = {
    pending: "Pending",
    submitted: "Submitted",
    accepted: "Accepted",
    unlocked: "Unlocked",
    revision_request: "Revision Request",
    cancelled: "Cancelled",
  };

  let role = user.role;

  return (
    <Fragment>
      <div className={styles.deliverableCard}>
        <div className={styles.deliverableHeader}>
          <h5 className={styles.deliverableNumber}>
            Delivrable number <span>#{deliverable.position}</span>
          </h5>
          <p
            className={`${styles.deliverableStatus} ${deliverableStatus[deliverable.status]}`}
          >
            {statusLabel[deliverable.status]}
          </p>
        </div>

        <div className={styles.deliverableBody}>
          <div className={styles.deliverableSummary}>
            <h3 className={styles.deliverableTitle}>{deliverable.title}</h3>
            <p className={styles.deliverableDescription}>
              {deliverable.description}
            </p>
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
        statusLabel={statusLabel}
        deliverableStatus={deliverableStatus}
        userType={role}
      />
    </Fragment>
  );
}

export default DeliverableCard;
