import SimpleCard from "../../components/cards/SimpleCard";
import styles from "./ContractsPage.module.css";
import { contracts } from "../../api/contracts";
import ContractCard from "../../components/cards/ContractCard";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import FilterBox from "../../components/common/FilterBox";

function ContractsPage() {
  const [filterParams, setFilterParams] = useSearchParams();
  const currentParams = new URLSearchParams(filterParams);

  const search = currentParams.get("search") || "";
  const sortedby = currentParams.get("sortedby") || "";
  const status = currentParams.get("status") || "";

  // * add two keys to facilitate the contracts filtering
  const processedContracts = useMemo(() => {
    return contracts.map((contract) => ({
      ...contract,
      createdAtTimestamp: new Date(contract.createdAt).getTime(),
      searchText: `${contract.projectTitle} ${contract.status}`.toLowerCase(),
    }));
  }, [contracts]);

  // * filter projects before display them
  const filtredProjects = useMemo(() => {
    let res = [...processedContracts];
    if (search.trim()) {
      res = res.filter((contract) =>
        contract.searchText.includes(search.trim().toLowerCase()),
      );
    }
    if (status.trim()) {
      res = res.filter((contract) =>
        contract.searchText.includes(status.trim().toLowerCase()),
      );
    }
    if (sortedby === "newest") {
      res = res.sort((a, b) => b.createdAtTimestamp - a.createdAtTimestamp);
    } else if (sortedby === "oldest") {
      res = res.sort((a, b) => a.createdAtTimestamp - b.createdAtTimestamp);
    }

    return res;
  }, [processedContracts, search, sortedby, status]);

  // * handle filter inputs change
  const handleInputsChange = (e) => {
    const { name, value } = e.target;

    setFilterParams((prev) => {
      const nextParams = new URLSearchParams(prev);

      if (name === "search") {
        if (value) {
          nextParams.set("search", value);
        } else {
          nextParams.delete("search");
        }
        return nextParams;
      }

      if (name === "sortedby") {
        if (value) {
          nextParams.set("sortedby", value);
        } else {
          nextParams.delete("sortedby");
        }
        return nextParams;
      }

      if (name === "status") {
        if (value) {
          nextParams.set("status", value);
        } else {
          nextParams.delete("status");
        }
        return nextParams;
      }
    });
  };

  const handleClearFilters = () => {
    currentParams.delete("search");
    currentParams.delete("status");
    currentParams.delete("sortedby");
    setFilterParams(currentParams);
  };

  // * overview cards
  const overviewCards = [
    {
      id: 0,
      title: "Completed",
      total: 19,
      subTitle: "all time",
    },
    {
      id: 1,
      title: "Total Spending",
      total: "$999",
      subTitle: "across all contracts",
    },
    {
      id: 2,
      title: "Active Contracts",
      total: 5,
      subTitle: "Currently running",
    },
    {
      id: 3,
      title: "Pending Payment",
      total: "$120",
      subTitle: "awaiting relaise",
    },
  ];

  // * values object to send to FilterBox component
  const values = {
    search: search,
    sortedBy: sortedby,
    status: status,
  };

  // * status values
  const statusValues = ["active", "pending", "completed", "cancelled"];


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
          <p>99 contract</p>
        </div>

        <div className={styles.contractsList}>
          {filtredProjects.map((contract) => (
            <ContractCard key={contract.id} contract={contract} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContractsPage;
