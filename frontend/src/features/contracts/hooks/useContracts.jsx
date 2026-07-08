import { useEffect, useState } from "react";
import { contractApi } from "../../../api/contracts/contractApi";
import { useTranslation } from "react-i18next";
import { formatMoney } from "../../../utils/helpers";

function useContracts(searchParams, role) {
  const { t } = useTranslation();
  const [contracts, setContracts] = useState([]);
  const [contractStats, setContractStats] = useState([]);

  useEffect(() => {
    const loadContractStats = async () => {
      const result = await contractApi.getContractsStats(role);
      setContractStats(result.data);
    };
    loadContractStats();
  }, []);

  useEffect(() => {
    const loadContracts = async () => {
      const queryString = searchParams.toString();
      const result = await contractApi.getContracts(role, queryString);
      setContracts(result.data);
    };
    loadContracts();
  }, [searchParams, role]);

  // * overview cards

  const overviewCards =
    role === "client"
      ? [
          {
            id: 0,
            title: t("common.labels.completedContracts"),
            total: contractStats?.completed_contracts_count ?? "__",
            subTitle: t("contractsList.stats.completed.subTitle"),
          },
          {
            id: 2,
            title: t("common.labels.activeContracts"),
            total: contractStats?.active_contracts_count ?? "__",
            subTitle: t("contractsList.stats.active.subTitle"),
          },
          {
            id: 1,
            title: t("contractsList.stats.spending.title"),
            total: formatMoney(contractStats?.total_spent) ?? "__",
            subTitle: t("contractsList.stats.spending.subTitle"),
          },
          {
            id: 3,
            title: t("contractsList.stats.escrow.title"),
            total: formatMoney(contractStats?.total_in_escrow) ?? "__",
            subTitle: t("contractsList.stats.escrow.subTitle"),
          },
        ]
      : [
          {
            id: 0,
            title: t("common.labels.completedContracts"),
            total: contractStats?.completed_contracts ?? "__",
            subTitle: t("contractsList.stats.completed.subTitle"),
          },
          {
            id: 2,
            title: t("common.labels.activeContracts"),
            total: contractStats?.active_contracts ?? "__",
            subTitle: t("contractsList.stats.active.subTitle"),
          },
          {
            id: 1,
            title: t("contractsList.stats.earning.title"),
            total: formatMoney(contractStats?.total_earnings) ?? "__",
            subTitle: t("contractsList.stats.earning.subTitle"),
          },
        ];

  return { contracts, contractStats, overviewCards };
}

export default useContracts;
