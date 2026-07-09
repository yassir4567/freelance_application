import styles from "../styles/ContractDetail.module.css";
import ContractHeader from "../components/ContractHeader";
import ContractParty from "../components/ContractParty";
import ContractSummary from "../components/ContractSummary";
import ContractDeliverables from "../components/ContractDeliverables";
import ContractPayments from "../components/ContractPayments";
import ContractTabs from "../components/ContractTabs";
import { useParams, useSearchParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { CONTRACT_STATUS_CLASS } from "../utils/contractDisplay";
import { useTranslation } from "react-i18next";
import useContractDetails from "../hooks/useContractDetails";
import useContractDetailsData from "../hooks/useContractDetailsData";

const VALID_TABS = ["overview", "deliverables", "payments"];

function ContractDetail() {
  const { t } = useTranslation();
  const { contractId } = useParams();
  const { user } = useAuth();
  const role = user?.role;

  const [searchParams, setSearchParams] = useSearchParams();

  const { isLoading, errorMessage, contract, setContract } = useContractDetails(
    contractId,
    role,
    t,
  );

  const {
    deliverables,
    completedDeliverables,
    currentDeliverable,
    paymentSummary,
    headerContent,
    userInfo,
    headerInfo,
    summary,
    tabs,
  } = useContractDetailsData(contract, role, t);

  const activeTabParam = searchParams.get("tab");
  const activeTab = VALID_TABS.includes(activeTabParam)
    ? activeTabParam
    : "overview";

  const handleTabChange = (tabId) => {
    setSearchParams((prev) => {
      const nextParams = new URLSearchParams(prev);

      if (tabId === "overview") {
        nextParams.delete("tab");
      } else {
        nextParams.set("tab", tabId);
      }

      return nextParams;
    });
  };

  if (isLoading) {
    return (
      <div className={styles.contractDetailPage}>
        <div className={styles.stateCard}>
          <p className={styles.stateKicker}>{t("ui.states.loading")}</p>
          <h1>{t("ui.states.loadingContractDetailsTitle")}</h1>
          <p>{t("ui.states.loadingContractDetailsDescription")}</p>
        </div>
      </div>
    );
  }

  if (errorMessage || !contract || contract.status === "pending") {
    return (
      <div className={styles.contractDetailPage}>
        <div className={`${styles.stateCard} ${styles.errorState}`}>
          <p className={styles.stateKicker}>
            {t("ui.states.contractUnavailable")}
          </p>
          <h1>{t("ui.states.contractUnavailableTitle")}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.contractDetailPage}>
      <ContractHeader
        statusClass={CONTRACT_STATUS_CLASS}
        headerContent={headerContent}
        role={role}
      />

      <div className={styles.contractWorkspace}>
        <aside className={styles.sidebar}>
          <ContractParty role={role} user={userInfo} headerInfo={headerInfo} />
        </aside>

        <main className={styles.mainPanel}>
          <ContractTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />

          <div className={styles.tabPanel}>
            {activeTab === "overview" && <ContractSummary summary={summary} />}

            {activeTab === "deliverables" && (
              <ContractDeliverables
                contract={contract}
                setContract={setContract}
              />
            )}

            {activeTab === "payments" && (
              <ContractPayments
                deliverables={deliverables}
                paymentSummary={paymentSummary}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default ContractDetail;
