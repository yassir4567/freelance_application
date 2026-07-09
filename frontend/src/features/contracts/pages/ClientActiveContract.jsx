import { useState } from "react";
import styles from "../styles/ClientActiveContract.module.css";
import { NavLink, useParams } from "react-router-dom";
import ClientActiveContractHeader from "../components/ClientActiveContractHeader";
import { useAuth } from "../../../context/AuthContext";
import { FiArrowLeft } from "react-icons/fi";
import ContractSetUpForm from "../components/ContractSetUpForm";
import contractImg from "../../../assets/images/contract_img.svg";
import ClientSetUpDeliverableForm from "../components/ClientSetUpDeliverableForm";
import SetUpContractPaymentSummary from "../components/SetUpContractPaymentSummary";
import CreatedDeliverableCollapse from "../components/CreatedDeliverableCollapse";
import SetUpContractFinalStep from "../components/SetUpContractFinalStep";
import SubmitSetupModal from "../components/modals/SubmitSetupModal";
import { useTranslation } from "react-i18next";
import useContractSetUpInfo from "../hooks/useContractSetUpInfo";
import useContractSetUpForm from "../hooks/useContractSetUpForm";
import useSubmitContractSetUp from "../hooks/useSubmitContractSetUp";

function ClientActiveContract() {
  const { t } = useTranslation();
  const { contractId } = useParams();
  const { isLoading, success, setupInfo, freelancerInfo, contractInfo } =
    useContractSetUpInfo(contractId);
  const {
    step,
    nextStep,
    previousStep,

    setUpContractFormData,
    setSetUpContractFormData,

    deliverables,
    setDeliverables,

    deliverableForm,
    setDeliverableForm,

    handleAddDeliverable,
    handleRemoveDeliverable,

    totalDeliverables,
    totalDeliverablesAmount,
  } = useContractSetUpForm();

  const { isSubmitting, handleSubmitContractSetUp } = useSubmitContractSetUp(
    contractId,
    setUpContractFormData,
    deliverables,
  );

  const [showModal, setShowModal] = useState(false);

  const { user } = useAuth();

  const role = user?.role;

  const onShowSendModal = () => setShowModal(true);
  const onCloseSendModal = () => setShowModal(false);

  if (isLoading) return <div>{t("ui.states.loading")}...</div>;

  if (!success || !setupInfo) {
    return (
      <div className={styles.contractSetUpPage}>
        <div className={`${styles.stateCard} ${styles.errorState}`}>
          <p className={styles.stateKicker}>{t("ui.states.pageUnavailable")}</p>
          <h1 className={styles.stateMessage}>
            {t("ui.states.pageUnavailableTitle")}
          </h1>
          <NavLink
            to={`/dashboard/client/contracts`}
            className={styles.backLink}
          >
            <FiArrowLeft />
            <span>{t("common.actions.backToContracts")}</span>
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.contractSetUpPage}>
      <ClientActiveContractHeader
        contractInfo={contractInfo}
        freelancerInfo={freelancerInfo}
        role={role}
      />

      <div className={styles.main}>
        <div className={styles.wrapper}>
          {step === 0 && (
            <div className={styles.setUpFormBox}>
              <div className={styles.setUpForm}>
                <ContractSetUpForm
                  nextStep={nextStep}
                  form={setUpContractFormData}
                  setForm={setSetUpContractFormData}
                />
              </div>
              <div className={styles.contractImg}>
                <img src={contractImg} />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className={styles.deliverablesContainer}>
              <div className={styles.deliverablesWrapper}>
                <div className={styles.deliverablesFormsHeader}>
                  <h1 className={styles.deliverablesFormsTitle}>
                    {t("setUpContract.deliverableForm.title")}
                  </h1>
                  <p className={styles.deliverablesFormsDescription}>
                    {t("setUpContract.deliverableForm.description")}
                  </p>
                </div>

                <div className={styles.deliverablesFormBox}>
                  <ClientSetUpDeliverableForm
                    nextStep={nextStep}
                    previousStep={previousStep}
                    form={deliverableForm}
                    setForm={setDeliverableForm}
                    handleAddDeliverable={handleAddDeliverable}
                    totalDeliverables={totalDeliverables}
                    totalDeliverablesAmount={totalDeliverablesAmount}
                    contractPrice={setUpContractFormData.final_price}
                  />
                </div>

                <div className={styles.createdDeliverablesBox}>
                  {deliverables.map((deliverable, index) => (
                    <CreatedDeliverableCollapse
                      key={index}
                      deliverable={deliverable}
                      index={index}
                      setDeliverables={setDeliverables}
                      handleRemoveDeliverable={handleRemoveDeliverable}
                    />
                  ))}
                </div>
              </div>
              <div className={styles.paymentSummary}>
                <SetUpContractPaymentSummary
                  final_price={setUpContractFormData.final_price}
                  totalDeliverablesAmount={totalDeliverablesAmount}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <SetUpContractFinalStep
              nextStep={nextStep}
              previousStep={previousStep}
              setUpContractFormData={setUpContractFormData}
              deliverables={deliverables}
              onShowSendModal={onShowSendModal}
            />
          )}
        </div>
      </div>

      {showModal && (
        <SubmitSetupModal
          onClose={onCloseSendModal}
          isSubmitting={isSubmitting}
          onConfirm={handleSubmitContractSetUp}
        />
      )}
    </div>
  );
}

export default ClientActiveContract;
