import { useEffect, useMemo, useState } from "react";
import styles from "../styles/ClientProjectsPage.module.css";
import { PiEmptyBold } from "react-icons/pi";
import { useSearchParams } from "react-router-dom";
import ClientProjectCard from "../components/ClientProjectCard";
import FilterBox from "../../../shared/common/filters/FilterBox";
import { getClientProjects } from "../../../api/projects/getClientProjects";

function ClientProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [filterParams, setFilterParams] = useSearchParams();

  // * get query params
  const search = filterParams.get("search") || "";
  const sort = filterParams.get("sort") || "";
  const status = filterParams.get("status") || "";

  useEffect(() => {
    const loadProjects = async () => {
      const result = await getClientProjects(filterParams.toString());
      setProjects(result.data);
    };
    loadProjects();
  }, [filterParams]);

  // * handle inputs changes
  const handleInputsChange = (e) => {
    const { name, value } = e.target;

    const params = new URLSearchParams(filterParams);
    if (value && value.trim() !== "") {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    setFilterParams(params);
  };

  // * clear all filters
  const handleClearFilters = () => {
    setFilterParams({});
  };

  // * inputs values
  const inputValues = {
    search: search,
    status: status,
    sort: sort,
  };

  const statusValues = [
    "open",
    "in_progress",
    "in_review",
    "completed",
    "cancelled",
  ];

  return (
    <div className={styles.projectsPage}>
      <h1 className="pageTitle">All Projects Posts</h1>
      <div className={styles.projectsPageMain}>
        <div className={styles.projectsFilterSection}>
          <FilterBox
            inputValues={inputValues}
            statusValues={statusValues}
            handleInputsChange={handleInputsChange}
            handleClearFilters={handleClearFilters}
          />
        </div>

        <div className={styles.projectsSection}>
          {projects.length ? (
            projects.map((project) => (
              <ClientProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className={styles.empty}>
              <p className={styles.emptyMsg}>Empty projects ...</p>
              <PiEmptyBold className={styles.emptyIcon} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientProjectsPage;
