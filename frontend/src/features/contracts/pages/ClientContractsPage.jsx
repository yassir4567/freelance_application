import SimpleCard from "../../../shared/ui/SimpleCard";
import styles from "../styles/ClientContractsPage.module.css";
import ContractCard from "../components/ContractCard";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilterBox from "../../../shared/common/filters/FilterBox";
import { getClientContractStats } from "../../../api/contracts/getClientContractStats";
import { getClientContracts } from "../../../api/contracts/getClientContracts";
import { useTranslation } from "react-i18next";

function ClientContractsPage() {
  const { t } = useTranslation();
  const [contracts, setContracts] = useState([]);
  const [contractStats, setContractStats] = useState([]);
  const [filterParams, setFilterParams] = useSearchParams();

  const search = filterParams.get("search") || "";
  const sort = filterParams.get("sort") || "";
  const status = filterParams.get("status") || "";

  useEffect(() => {
    const loadContractStats = async () => {
      const result = await getClientContractStats();
      setContractStats(result.data);
    };
    loadContractStats();
  }, []);

  useEffect(() => {
    const loadContracts = async () => {
      const result = await getClientContracts(filterParams.toString());
      setContracts(result.data);
    };
    loadContracts();
  }, [filterParams]);

  // * handle filter inputs change
  const handleInputsChange = (e) => {
    const { name, value } = e.target;

    setFilterParams((prev) => {
      const nextParams = new URLSearchParams(prev);

      if (value && value.trim() !== "") {
        nextParams.set(name, value);
      } else {
        nextParams.delete(name);
      }
      return nextParams;
    });
  };

  const handleClearFilters = () => {
    setFilterParams({});
  };

  // * overview cards
  const overviewCards = [
    {
      id: 0,
      title: t("common.labels.completedContracts"),
      total: contractStats?.completed_contracts_count || "__",
      subTitle: t("contractsList.stats.completed.subTitle"),
    },
    {
      id: 2,
      title: t("common.labels.activeContracts"),
      total: contractStats?.active_contracts_count || "__",
      subTitle: t("contractsList.stats.active.subTitle"),
    },
    {
      id: 1,
      title: t("contractsList.stats.spending.title"),
      total: `$${contractStats?.total_spent?.toFixed(3)}` || "__",
      subTitle: t("contractsList.stats.spending.subTitle"),
    },
    {
      id: 3,
      title: t("contractsList.stats.escrow.title"),
      total: `$${contractStats?.total_in_escrow?.toFixed(3)}` || "__",
      subTitle: t("contractsList.stats.escrow.subTitle"),
    },
  ];

  // * values object to send to FilterBox component
  const values = {
    search: search,
    sort: sort,
    status: status,
  };

  // * status values
  const statusValues = ["pending", "active", "completed", "cancelled"];

  return (
    <div className={styles.contractsPage}>
      <div className={styles.pageHeader}>
        <h1 className="pageTitle">{t("contractsList.title")}</h1>
        <p className={styles.contractsPageSubTitle}>
          {t("contractsList.subTitle")}
        </p>
      </div>

      <div className={styles.overviewSection}>
        <h2 className={styles.overviewTitle}>
          {t("common.labels.overview")}
        </h2>
        <div className={styles.contractsOverview}>
          {overviewCards.map((ov) => (
            <SimpleCard
              key={ov.id}
              title={ov.title}
              value={ov.total}
              description={ov.subTitle}
              className={styles.contractsOverviewCard}
            />
          ))}
        </div>
      </div>

      <FilterBox
        inputValues={values}
        statusValues={statusValues}
        handleInputsChange={handleInputsChange}
        handleClearFilters={handleClearFilters}
      />

      <div className={styles.contractsListSection}>
        <div className={styles.contractsListHeader}>
          <h3 className={styles.contractsListTitle}>
            {t("contractsList.cardsTitle")}
          </h3>
        </div>

        <div className={styles.contractsList}>
          {contracts.map((contract) => (
            <ContractCard key={contract.id} contract={contract} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClientContractsPage;
