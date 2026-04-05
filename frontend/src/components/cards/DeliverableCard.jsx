import { Fragment, useState } from "react";
import styles from "./DeliverableCard.module.css";
import DeliverableDetailModal from "../modals/DeliverableDetailModal";

function DeliverableCard({ deliverable }) {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const deliverableStatus = {
    pending: "status-accent",
    submitted: "status-info",
    accepted: "status-success",
    unlocked: "status-purple",
    revision_requested: "status-warning",
    cancelled: "status-danger",
  };

  const statusLabel = {
    pending: "Pending",
    submitted: "Submitted",
    accepted: "Accepted",
    unlocked: "Unlocked",
    revision_requested: "Revision Request",
    cancelled: "Cancelled",
  };

  let user = "freelancer";

  const helperMessage = {
    accepted: "This deliverable has been accepted",
    revision_requested:
      user === "client"
        ? "Waiting for freelancer resubmit"
        : "client requested a change , update and resubmit this deliverable",
    pending: "Waiting for previous deliverable acceptance and escrow funding",
    unlocked:
      user === "client"
        ? "Waiting for freelancer submit"
        : "This deliverable is now available for submission",
    submitted:
      user === "client"
        ? "Freelancer awaits your approval"
        : "Waiting for client review",
  };


  return (
    <Fragment>
      <div className={styles.deliverableCard}>
        <div className={styles.deliverableHeader}>
          <h5 className={styles.deliverableNumber}>
            Delivrable number <span>#{deliverable.id}</span>
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
            {helperMessage[deliverable.status] && (
              <p className={styles.quickMessage}>
                {helperMessage[deliverable.status]}
              </p>
            )}
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
        userType={user}
      />
    </Fragment>
  );
}

export default DeliverableCard;
