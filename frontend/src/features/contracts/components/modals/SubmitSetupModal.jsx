import { FiAlertCircle } from "react-icons/fi";
import styles from "../../styles/SubmitSetupModal.module.css";

function SubmitSetupModal({onClose , isSubmitting , onConfirm}) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.iconBox}>
          <FiAlertCircle />
        </div>
        <div className={styles.content}>
          <p className={styles.kicker}>Final confirmation</p>

          <h2 className={styles.title}>Activate this contract?</h2>

          <p className={styles.description}>
            Once you confirm, the contract will be activated with the terms and
            deliverables you entered. Make sure everything is correct before
            continuing.
          </p>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={onClose}
            className={styles.cancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className={styles.confirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Activating..." : "Confirm and activate"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubmitSetupModal;
