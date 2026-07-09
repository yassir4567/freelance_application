import SimpleCard from "../../../shared/ui/SimpleCard";
import styles from "../styles/ClientContractsPage.module.css";
import ContractCard from "../components/ContractCard";
import FilterBox from "../../../shared/common/filters/FilterBox";
import { useTranslation } from "react-i18next";
import useContracts from "../hooks/useContracts";
import useContractsFilters from "../hooks/useContractsFilters";
import { formatMoney } from "../../../utils/helpers";

function ClientContractsPage() {
  const { t } = useTranslation();

  const { searchParams, handleInputsChange, handleClearFilters, filterValues } =
    useContractsFilters();

  const { contracts, contractStats } = useContracts(searchParams, "client");

  const overviewCards = [
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
  ];

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
        <h2 className={styles.overviewTitle}>{t("common.labels.overview")}</h2>
        <div className={styles.contractsOverview}>
          {overviewCards?.map((ov) => (
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
          {contracts?.map((contract) => (
            <ContractCard key={contract.id} contract={contract} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClientContractsPage;
