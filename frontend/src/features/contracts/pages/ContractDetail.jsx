import styles from "../styles/ContractDetail.module.css";
import ContractHeader from "../components/ContractHeader";
import ContractParty from "../components/ContractParty";
import ContractSummary from "../components/ContractSummary";
import ContractDeliverables from "../components/ContractDeliverables";
import ContractPayments from "../components/ContractPayments";
import ContractTabs from "../components/ContractTabs";
import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getClientContractDetail } from "../../../api/contracts/getClientContractDetail";
import { useAuth } from "../../../context/AuthContext";
import { getFreelancerContractDetail } from "../../../api/contracts/getFreelancerContractDetail";
import {
  calculatePercent,
  CONTRACT_STATUS_CLASS,
  formatDisplayDate,
} from "../utils/contractDisplay";
import profile from "../../../assets/images/profile.png";
import { useTranslation } from "react-i18next";

const VALID_TABS = ["overview", "deliverables", "payments"];

function ContractDetail() {
  const { t } = useTranslation();
  const { contractId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [contract, setContract] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useAuth();

  const role = user?.role;

  useEffect(() => {

    const loadContract = async () => {
      if (!user || !contractId || !role) {
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      const result =
        role === "client"
          ? await getClientContractDetail(contractId)
          : await getFreelancerContractDetail(contractId);


      if (result.success) {
        setContract(result.data ?? null);
        setIsLoading(false);
        return;
      }

      setContract(null);
      setErrorMessage(result.message || t("ui.states.contractUnavailableTitle"));
      setIsLoading(false);
    };

    loadContract();
  }, [user, contractId, role]);

  const deliverables = useMemo(() => contract?.deliverables ?? [], [contract]);

  const completedDeliverables = useMemo(
    () => deliverables.filter((del) => del.status === "accepted").length,
    [deliverables],
  );

  const currentDeliverable = useMemo(
    () =>
      deliverables.find((del) =>
        ["unlocked", "revision_request", "submitted"].includes(del.status),
      ),
    [deliverables],
  );

  const paymentSummary = useMemo(() => {
    const payments = deliverables
      .map((deliverable) => deliverable.payment)
      .filter(Boolean);

    const totalAmount = deliverables.reduce(
      (acc, deliverable) => acc + Number(deliverable.amount || 0),
      0,
    );

    const paidAmount = payments.reduce(
      (acc, payment) =>
        payment.status === "released" ? acc + Number(payment.amount || 0) : acc,
      0,
    );

    const escrowAmount = payments.reduce(
      (acc, payment) =>
        payment.status === "escrow" ? acc + Number(payment.amount || 0) : acc,
      0,
    );

    return {
      payments,
      totalAmount,
      paidAmount,
      escrowAmount,
      pendingAmount: Math.max(totalAmount - (paidAmount + escrowAmount), 0),
      paymentProgress: calculatePercent(paidAmount, totalAmount),
    };
  }, [deliverables]);

  const activeTabParam = searchParams.get("tab");
  const activeTab = VALID_TABS.includes(activeTabParam)
    ? activeTabParam
    : "overview";

  const tabs = useMemo(
    () => [
      { id: "overview", label: t("common.labels.overview") },
      {
        id: "deliverables",
        label: t("common.labels.deliverables"),
        count: deliverables.length,
      },
      {
        id: "payments",
        label: t("common.labels.payments"),
        count: paymentSummary.payments.length,
      },
    ],
    [deliverables.length, paymentSummary.payments.length],
  );

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

  const headerContent = useMemo(() => {
    return {
      status: contract?.status,
      projectTitle: contract?.project?.title,
      budget: contract?.final_price,
      completedDeliverables,
      totalDeliverables: deliverables.length,
      progress: calculatePercent(completedDeliverables, deliverables.length),
    };
  }, [contract, completedDeliverables, deliverables.length]);

  const other_user =
    role === "client" ? contract?.freelancer : contract?.client;

  const userInfo = useMemo(() => {
    return {
      fullname:
        other_user?.first_name || other_user?.last_name
          ? `${other_user?.first_name ?? ""} ${other_user?.last_name ?? ""}`.trim()
          : "Not assigned yet",
      // avatar: other_user?.avatar,
      avatar: profile,
      id: other_user?.user_id,
    };
  }, [other_user]);

  const headerInfo = useMemo(() => {
    return {
      status: contract?.status,
      created_at: formatDisplayDate(contract?.created_at),
      final_deadline: formatDisplayDate(contract?.final_deadline),
      cur_deliverable_deadline: formatDisplayDate(currentDeliverable?.deadline),
    };
  }, [contract, currentDeliverable]);

  const summary = useMemo(() => {
    return {
      id: contract?.id,
      description: contract?.description,
      budget: contract?.final_price,
      deadline: contract?.final_deadline,
      created_at: contract?.created_at,
      total_deliverables: deliverables.length,
      completed_deliverables: completedDeliverables,
      contract_pdf: contract?.fichier_pdf,
      contract_pdf_url: contract?.fichier_pdf_url,
      paymentProgress: paymentSummary.paymentProgress,
      paidAmount: paymentSummary.paidAmount,
    };
  }, [contract, completedDeliverables, deliverables.length, paymentSummary]);

  if (isLoading) {
    return (
      <div className={styles.contractDetailPage}>
        <div className={styles.stateCard}>
          <p className={styles.stateKicker}>{t("ui.states.loading")}</p>
          <h1>{t("ui.states.loadingContractDetailsTitle")}</h1>
          <p>
            {t("ui.states.loadingContractDetailsDescription")}
          </p>
        </div>
      </div>
    );
  }

  if (errorMessage || !contract || contract.status === "pending") {
    return (
      <div className={styles.contractDetailPage}>
        <div className={`${styles.stateCard} ${styles.errorState}`}>
          <p className={styles.stateKicker}>{t("ui.states.contractUnavailable")}</p>
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
