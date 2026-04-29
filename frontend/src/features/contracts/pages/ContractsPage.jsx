import SimpleCard from "../../../shared/ui/SimpleCard";
import styles from "../styles/ContractsPage.module.css";
import ContractCard from "../components/ContractCard";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilterBox from "../../../shared/common/filters/FilterBox";
import { getClientContractStats } from "../../../api/contracts/getClientContractStats";
import { getClientContracts } from "../../../api/contracts/getClientContracts";

function ContractsPage() {
  const [contracts, setContracts] = useState([]);
  const [contractStats, setContractStats] = useState([]);
  const [filterParams, setFilterParams] = useSearchParams();

  const search = filterParams.get("search") || "";
  const sort = filterParams.get("sort") || "";
  const status = filterParams.get("status") || "";

  useEffect(() => {
    const loadContractStats = async () => {
      const result = await getClientContractStats();
      console.log(result.data);
      
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
      title: "Completed Contracts",
      total: contractStats?.completed_contracts_count || "__",
      subTitle: "all time",
    },
    {
      id: 2,
      title: "Active Contracts",
      total: contractStats?.active_contracts_count || "__",
      subTitle: "Currently running",
    },
    {
      id: 1,
      title: "Total Spending",
      total: `$${contractStats?.total_spent?.toFixed(3)}` || "__",
      subTitle: "across all contracts",
    },
    {
      id: 3,
      title: "In Escrow",
      total: `$${contractStats?.total_in_escrow?.toFixed(3)}` || "__",
      subTitle: "Funds awaiting release",
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

  return (
    <div className={styles.contractsPage}>
      <div className={styles.pageHeader}>
        <h1 className="pageTitle">Client Contracts</h1>
        <p className={styles.contractsPageSubTitle}>
          Track negotiations, active work, and completed agreements in one
          place.
        </p>
      </div>

      <div className={styles.overviewSection}>
        <h2 className={styles.overviewTitle}>Overview</h2>
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
          <h3 className={styles.contractsListTitle}>Contracts List</h3>
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

export default ContractsPage;
