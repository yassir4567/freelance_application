import { FiAlertCircle } from "react-icons/fi";
import styles from "../../styles/SubmitSetupModal.module.css";
import { useTranslation } from "react-i18next";

function SubmitSetupModal({ onClose, isSubmitting, onConfirm }) {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.iconBox}>
          <FiAlertCircle />
        </div>
        <div className={styles.content}>
          <p className={styles.kicker}>
            {t("setUpContract.modal.subTitle")}
          </p>

          <h2 className={styles.title}>
            {t("setUpContract.modal.title")}
          </h2>

          <p className={styles.description}>
            {t("setUpContract.modal.description")}
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
            {isSubmitting ? "Activating..." : t("setUpContract.modal.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubmitSetupModal;
