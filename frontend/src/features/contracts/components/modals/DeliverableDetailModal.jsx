import { Fragment, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import styles from "../../styles/DeliverableDetailModal.module.css";
import SubmitDeliverableForm from "../SubmitDeliverableForm";
import { acceptDeliverable } from "../../../../api/deliverables/acceptDeliverable";
import { getClientContractDetail } from "../../../../api/contracts/getClientContractDetail";
import { requestDeliverableRevision } from "../../../../api/deliverables/requestDeliverableRevision";
import {
  formatCurrency,
  formatDisplayDate,
  formatStatusLabel,
  getStatusClass,
  valueOrFallback,
} from "../../utils/contractDisplay";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [openSubmitForm, setOpenSubmitForm] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [acceptError, setAcceptError] = useState("");
  const [isRequestingRevision, setIsRequestingRevision] = useState(false);
  const [revisionError, setRevisionError] = useState("");

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

  const handleAccept = async () => {
    setAcceptError("");
    setIsAccepting(true);

    const result = await acceptDeliverable(deliverable.id);

    if (!result.success) {
      setAcceptError(result.message || "Accept deliverable failed");
      setIsAccepting(false);
      return;
    }

    const contractResult = await getClientContractDetail(contract.id);

    if (!contractResult.success) {
      setAcceptError(contractResult.message || "Contract refresh failed");
      setIsAccepting(false);
      return;
    }

    setContract(contractResult.data);
    setIsAccepting(false);
    onClose();
  };

  const handleRequestRevision = async () => {
    setRevisionError("");
    setIsRequestingRevision(true);

    const result = await requestDeliverableRevision(deliverable.id);

    if (!result.success) {
      setRevisionError(result.message || "Request revision failed");
      setIsRequestingRevision(false);
      return;
    }

    const contractResult = await getClientContractDetail(contract.id);

    if (!contractResult.success) {
      setRevisionError(contractResult.message || "Contract refresh failed");
      setIsRequestingRevision(false);
      return;
    }

    setContract(contractResult.data);
    setIsRequestingRevision(false);
    onClose();
  };

  // * show buttons based on deliverable status and the user type
  let content;
  if (userType === "client") {
    if (deliverable.status === "submitted") {
      content = (
        <Fragment>
          <button
            type="button"
            onClick={handleAccept}
            disabled={isAccepting}
            className={`${styles.deliverableBtn} ${styles.accept}`}
          >
            {isAccepting
              ? "Accepting..."
              : t("contractDetail.deliverableDetail.actions.accept")}
          </button>
          <button
            type="button"
            onClick={handleRequestRevision}
            disabled={isAccepting || isRequestingRevision}
            className={`${styles.deliverableBtn} ${styles.request_revision}`}
          >
            {isRequestingRevision
              ? "Sending..."
              : t("contractDetail.deliverableDetail.actions.revision")}
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
            {t("contractDetail.deliverableDetail.actions.submit")}
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
            {t("contractDetail.deliverableDetail.actions.reSubmit")}
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
              {t("contractDetail.deliverables.subTitle")} #
              {deliverable.position ?? deliverable.id}
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
            <span>{t("contractDetail.deliverableDetail.cards.amount")}</span>
            <span>{formatCurrency(deliverable.amount)}</span>
          </p>

          <p className={styles.contentItem}>
            <span>{t("contractDetail.deliverableDetail.cards.deadline")}</span>
            <span>{formatDisplayDate(deliverable.deadline)}</span>
          </p>

          <p className={styles.contentItem}>
            <span>
              {t("contractDetail.deliverableDetail.cards.unlockedAt")}
            </span>
            <span>{formatDisplayDate(deliverable.unlocked_at)}</span>
          </p>

          <p className={styles.contentItem}>
            <span>
              {t("contractDetail.deliverableDetail.cards.submittedAt")}
            </span>
            <span>{formatDisplayDate(deliverable.submitted_at)}</span>
          </p>

          <p className={styles.contentItem}>
            <span>
              {t("contractDetail.deliverableDetail.cards.acceptedAt")}
            </span>
            <span>{formatDisplayDate(deliverable.accepted_at)}</span>
          </p>
        </div>

        {hasSubmissionContent && (
          <div className={styles.submissionContentSection}>
            <h4 className={styles.submissionContentTitle}>
              {t("contractDetail.deliverableDetail.submission.title")}
            </h4>
            {deliverable.deliverable_links?.length ? (
              <div className={styles.links}>
                {deliverable.deliverable_links.map((link, index) => (
                  <div key={index} className={styles.linkItem}>
                    <span>
                      {t("contractDetail.deliverableDetail.submission.link")}{" "}
                      {index + 1}:
                    </span>
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
            <h4 className={styles.submissionContentTitle}>
              {t("contractDetail.deliverableDetail.submission.note")}
            </h4>
            <p className={styles.submissionNote}>
              {deliverable.submission_note || "No submission note provided."}
            </p>
          </div>
        )}

        {content && <div className={styles.actions}>{content}</div>}
        {acceptError && <p className={styles.emptyState}>{acceptError}</p>}
        {revisionError && <p className={styles.emptyState}>{revisionError}</p>}

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
