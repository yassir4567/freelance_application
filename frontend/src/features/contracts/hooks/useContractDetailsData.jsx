import { useMemo } from "react";
import { calculatePercent, formatDisplayDate } from "../utils/contractDisplay";
import profile from "../../../assets/images/profile.png";

function useContractDetailsData(contract, role, t) {
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

  return {
    deliverables,
    completedDeliverables,
    currentDeliverable,
    paymentSummary,
    headerContent,
    userInfo,
    headerInfo,
    summary,
    tabs,
  };
}

export default useContractDetailsData;
