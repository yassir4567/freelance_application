import { useEffect, useState } from "react";
import styles from "../styles/FreelancerContractsPage.module.css";
import SimpleCard from "../../../shared/ui/SimpleCard";
import FilterBox from "../../../shared/common/filters/FilterBox";
import { useSearchParams } from "react-router-dom";
import ContractCard from "../components/ContractCard";
import { useTranslation } from "react-i18next";
import { contractApi } from "../../../api/contracts/contractApi";

function FreelancerContractsPage() {
  const { t } = useTranslation();
  const [contractStats, setContractStats] = useState([]);
  const [filterParams, setFilterParams] = useSearchParams();
  const [contracts, setContracts] = useState([]);

  const search = filterParams.get("search") || "";
  const sort = filterParams.get("sort") || "";
  const status = filterParams.get("status") || "";

  useEffect(() => {
    const loadContractStats = async () => {
      const result = await contractApi.getContractsStats('freelancer');
      setContractStats(result.data);
    };
    loadContractStats();
  }, []);

  useEffect(() => {
    const loadContracts = async () => {
      const queryString = filterParams.toString()
      const result = await contractApi.getContracts('freelancer' , queryString)
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

  // * overview cards
  const overviewCards = [
    {
      id: 0,
      title: t("common.labels.completedContracts"),
      total: contractStats?.completed_contracts || "__",
      subTitle: t("contractsList.stats.completed.subTitle"),
    },
    {
      id: 2,
      title: t("common.labels.activeContracts"),
      total: contractStats?.active_contracts || "__",
      subTitle: t("contractsList.stats.active.subTitle"),
    },
    {
      id: 1,
      title: t("contractsList.stats.earning.title"),
      total: `$${contractStats?.total_earnings?.toFixed(3)}` || "__",
      subTitle: t("contractsList.stats.earning.subTitle"),
    },
  ];

  // * values object to send to FilterBox component
  const values = {
    search: search,
    sort: sort,
    status: status,
  };

  // * status values
  const statusValues = ["active", "completed", "cancelled"];

  const handleClearFilters = () => {
    setFilterParams({});
  };
  return (
    <div className={styles.contractsPage}>
      <div className={styles.pageHeader}>
        <h1 className="pageTitle">{t("contractsList.title")}</h1>
        <p className={styles.contractsPageSubTitle}>
          {t("contractsList.subTitle")}
        </p>
      </div>

      <div className={styles.overviewSection}>
        <h2 className={styles.overviewTitle}>{t("common.labels.overview")}</h2>
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
          {contracts?.map((contract) => (
            <ContractCard key={contract.id} contract={contract} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FreelancerContractsPage;
