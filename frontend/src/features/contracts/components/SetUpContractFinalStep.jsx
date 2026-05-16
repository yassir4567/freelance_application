import { useTranslation } from "react-i18next";
import styles from "../styles/SetUpContractFinalStep.module.css";
import FinalStepDeliverableCard from "./FinalStepDeliverableCard";

function SetUpContractFinalStep({
  nextStep,
  previousStep,
  setUpContractFormData,
  deliverables,
  onShowSendModal,
}) {
  const { t } = useTranslation();
  return (
    <div className={styles.finalStepCmp}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>
          {t("setUpContract.finalStep.title")}
        </h1>
        <p className={styles.headerDescription}>
          {t("setUpContract.finalStep.description")}
        </p>
      </div>

      <div className={styles.contractSetUpInfo}>
        <h5 className={styles.minTitle}>
          {t("setUpContract.finalStep.contractInfo")}
        </h5>
        <div className={styles.row}>
          <div className={styles.contractInfoCard}>
            <h5 className={styles.cardTitle}>
              {t("setUpContract.finalStep.contractAmount")}
            </h5>
            <p>${setUpContractFormData.final_price}</p>
          </div>
          <div className={styles.contractInfoCard}>
            <h5 className={styles.cardTitle}>
              {t("common.labels.deadline")}
            </h5>
            <p>{setUpContractFormData.final_deadline}</p>
          </div>
        </div>

        <div className={styles.contractDescriptionCard}>
          <h5 className={styles.cardTitle}>
            {t("common.labels.description")}
          </h5>
          <p>{setUpContractFormData.description}</p>
        </div>
      </div>

      <div className={styles.deliverablesContainer}>
        <h6 className={styles.minTitle}>
          {t("common.labels.deliverable")}s
        </h6>
        <div className={styles.deliverablesWrapper}>
          {deliverables.map((deliverable, index) => (
            <FinalStepDeliverableCard
              key={index}
              index={index}
              deliverable={deliverable}
            />
          ))}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={previousStep}
            className={styles.previous}
          >
            Previous
          </button>
          <button
            type="button"
            className={styles.send}
            onClick={onShowSendModal}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default SetUpContractFinalStep;
