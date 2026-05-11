import { Fragment, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import styles from "../../styles/DeliverableDetailModal.module.css";
import SubmitDeliverableForm from "../SubmitDeliverableForm";
import {
  formatCurrency,
  formatDisplayDate,
  formatStatusLabel,
  getStatusClass,
  valueOrFallback,
} from "../../utils/contractDisplay";

function DeliverableDetailModal({
  deliverable,
  isOpen,
  onClose,
  statusLabel,
  deliverableStatus,
  userType,
  contract,
  setContract,
}) {
  const [openSubmitForm, setOpenSubmitForm] = useState(false);

  // * stop the scrolling when modal is open
  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // * close modal with escape key
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // * show submit deliverables form
  const showDeliverableForm = () => {
    setOpenSubmitForm(!openSubmitForm);
  };

  // * show buttons based on deliverable status and the user type
  let content;
  if (userType === "client") {
    if (deliverable.status === "submitted") {
      content = (
        <Fragment>
          <button className={`${styles.deliverableBtn} ${styles.accept}`}>
            Accept
          </button>
          <button
            className={`${styles.deliverableBtn} ${styles.request_revision}`}
          >
            Request Revision
          </button>
        </Fragment>
      );
    }
  } else if (userType === "freelancer") {
    if (deliverable.status === "unlocked") {
      content = (
        <Fragment>
          <button
            onClick={showDeliverableForm}
            className={`${styles.deliverableBtn} ${styles.submit}`}
          >
            Submit deliverable
          </button>
        </Fragment>
      );
    } else if (deliverable.status === "revision_request") {
      content = (
        <Fragment>
          <button
            onClick={showDeliverableForm}
            className={`${styles.deliverableBtn} ${styles.submit}`}
          >
            Resubmit deliverable
          </button>
        </Fragment>
      );
    }
  }

  const hasSubmissionContent = [
    "accepted",
    "submitted",
    "revision_request",
  ].includes(deliverable.status);

  const statusText =
    statusLabel[deliverable.status] || formatStatusLabel(deliverable.status);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.deliverableModal}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.deliverableHeader}>
          <div className={styles.headerRight}>
            <p className={styles.deliverableNumber}>
              Deliverable #{deliverable.position ?? deliverable.id}
            </p>
            <h3 className={styles.title}>
              {valueOrFallback(deliverable.title, "Untitled deliverable")}
            </h3>
          </div>

          <div className={styles.headerLeft}>
            <p
              className={`${styles.status} ${getStatusClass(
                deliverableStatus,
                deliverable.status,
              )}`}
            >
              {statusText}
            </p>
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
            >
              <IoClose />
            </button>
          </div>
        </div>

        <p className={styles.deliverableDescription}>
          {valueOrFallback(
            deliverable.description,
            "No description was provided for this deliverable.",
          )}
        </p>

        <div className={styles.contentGrid}>
          <p className={styles.contentItem}>
            <span>Amount</span>
            <span>{formatCurrency(deliverable.amount)}</span>
          </p>

          <p className={styles.contentItem}>
            <span>Deadline</span>
            <span>{formatDisplayDate(deliverable.deadline)}</span>
          </p>

          <p className={styles.contentItem}>
            <span>Unlocked at</span>
            <span>{formatDisplayDate(deliverable.unlocked_at)}</span>
          </p>

          <p className={styles.contentItem}>
            <span>Submitted at</span>
            <span>{formatDisplayDate(deliverable.submitted_at)}</span>
          </p>

          <p className={styles.contentItem}>
            <span>Accepted at</span>
            <span>{formatDisplayDate(deliverable.accepted_at)}</span>
          </p>
        </div>

        {hasSubmissionContent && (
          <div className={styles.submissionContentSection}>
            <h4 className={styles.submissionContentTitle}>Submission Links</h4>
            {deliverable.deliverable_links?.length ? (
              <div className={styles.links}>
                {deliverable.deliverable_links.map((link, index) => (
                  <div key={index} className={styles.linkItem}>
                    <span>Link {index + 1}:</span>
                    <a href={link} target="_blank" rel="noreferrer">
                      {link}
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.emptyState}>No submission links provided.</p>
            )}
          </div>
        )}

        {hasSubmissionContent && (
          <div className={styles.submissionContentSection}>
            <h4 className={styles.submissionContentTitle}>Submission Note</h4>
            <p className={styles.submissionNote}>
              {deliverable.submission_note || "No submission note provided."}
            </p>
          </div>
        )}

        {content && <div className={styles.actions}>{content}</div>}

        {openSubmitForm && (
          <SubmitDeliverableForm
            setContract={setContract}
            deliverableId={deliverable.id}
            contractId={contract.id}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}

export default DeliverableDetailModal;
