import styles from "../styles/FreelancerContractsPage.module.css";
import SimpleCard from "../../../shared/ui/SimpleCard";
import FilterBox from "../../../shared/common/filters/FilterBox";
import ContractCard from "../components/ContractCard";
import { useTranslation } from "react-i18next";
import useContractsFilters from "../hooks/useContractsFilters";
import useContracts from "../hooks/useContracts";
import { formatMoney } from "../../../utils/helpers";
import type { FreelancerContractListItem } from "../../../types/contract.types";

function FreelancerContractsPage() {
  const { t } = useTranslation();

  const { searchParams, handleInputsChange, handleClearFilters, filterValues } =
    useContractsFilters();
  const {
    contracts,
    isContractsLoading,
    contractsError,
    contractStats,
    isContractsStatsLoading,
    contractsStatsError,
  } = useContracts<FreelancerContractListItem>(searchParams, "freelancer");

  const overviewCards = [
    {
      id: 0,
      title: t("common.labels.completedContracts"),
      total: contractStats.completed_contracts ?? "__",
      subTitle: t("contractsList.stats.completed.subTitle"),
    },
    {
      id: 2,
      title: t("common.labels.activeContracts"),
      total: contractStats.active_contracts ?? "__",
      subTitle: t("contractsList.stats.active.subTitle"),
    },
    {
      id: 1,
      title: t("contractsList.stats.earning.title"),
      total: formatMoney(`${contractStats.total_earnings}`) ?? "__",
      subTitle: t("contractsList.stats.earning.subTitle"),
    },
  ];

  // * status values
  const statusValues = ["active", "completed", "cancelled"];

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
              className={styles.contractsOverviewCard ?? ""}
            />
          ))}
        </div>
      </div>

      <FilterBox
        inputValues={filterValues}
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

export default FreelancerContractsPage;
