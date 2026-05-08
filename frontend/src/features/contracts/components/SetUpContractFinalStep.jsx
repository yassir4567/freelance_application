import styles from "../styles/SetUpContractFinalStep.module.css";
import FinalStepDeliverableCard from "./FinalStepDeliverableCard";

function SetUpContractFinalStep({
  nextStep,
  previousStep,
  setUpContractFormData,
  deliverables,
}) {
  return (
    <div className={styles.finalStepCmp}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>
          Review and confirm contract setup
        </h1>
        <p className={styles.headerDescription}>
          Check the final terms, deliverables, and payment breakdown before
          activating the contract.
        </p>
      </div>

      <div className={styles.contractSetUpInfo}>
        <h5 className={styles.minTitle}>Contract info</h5>
        <div className={styles.row}>
          <div className={styles.contractInfoCard}>
            <h5 className={styles.cardTitle}>Contract amount</h5>
            <p>${setUpContractFormData.final_price}</p>
          </div>
          <div className={styles.contractInfoCard}>
            <h5 className={styles.cardTitle}>Deadline</h5>
            <p>{setUpContractFormData.final_deadline}</p>
          </div>
        </div>

        <div className={styles.contractDescriptionCard}>
          <h5 className={styles.cardTitle}>Description</h5>
          <p>{setUpContractFormData.description}</p>
        </div>
      </div>

      <div className={styles.deliverablesContainer}>
        <h6 className={styles.minTitle}>Deliverables</h6>
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
          <button onClick={previousStep} className={styles.previous}>Previous</button>
          <button className={styles.send}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default SetUpContractFinalStep;
