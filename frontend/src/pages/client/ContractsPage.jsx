import { CiSearch } from "react-icons/ci";
import SimpleCard from "../../components/cards/SimpleCard";
import styles from "./ContractsPage.module.css";
import { contracts } from "../../api/contracts";
import ContractCard from "../../components/cards/ContractCard";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

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

    return res 
  } , [processedContracts , search , sortedby , status]);

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

  const handleclearFilters = () => {
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

      <div className={styles.contractsFilterSection}>
        <div className={styles.searchBox}>
          <CiSearch className={styles.searchIcon} size={30} />
          <input
            type="text"
            name="search"
            value={search}
            onChange={handleInputsChange}
            className={styles.searchInput}
            placeholder="Search ..."
          />
        </div>

        <div className={styles.filterStatusBox}>
          <select name="status" value={status} onChange={handleInputsChange}>
            <option value="" disabled>
              Filter by status
            </option>
            <option value="active">Active</option>
            <option value="pending">pending</option>
            <option value="completed">completed</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div>

        <div className={styles.sortBox}>
          <select
            name="sortedby"
            value={sortedby}
            onChange={handleInputsChange}
          >
            <option value="" disabled>
              Sort by
            </option>
            <option value="newest">Latest contracts</option>
            <option value="oldest">Oldest contracts</option>
          </select>
        </div>
        <div className={styles.clearAllFilters}>
          <button onClick={handleclearFilters}>Clear all</button>
        </div>
      </div>

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
