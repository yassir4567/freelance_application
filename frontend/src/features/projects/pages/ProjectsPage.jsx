import { useMemo } from "react";
import styles from "../styles/ProjectsPage.module.css";
import { PiEmptyBold } from "react-icons/pi";
import { useSearchParams } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../api/projects";
import FilterBox from "../../../shared/common/filters/FilterBox";

function ProjectsPage() {
  const [filterParams, setFilterParams] = useSearchParams();

  // * get current query parameters from URL
  const currentParams = new URLSearchParams(filterParams);

  // * get query params
  const search = currentParams.get("search") || "";
  const sortedby = currentParams.get("sortedby") || "";
  const status = currentParams.get("status") || "";

  // * handle inputs changes
  const handleInputsChange = (e) => {
    const { name, value } = e.target;

    // * change query params based on inputs
    setFilterParams((prev) => {
      const nextParams = new URLSearchParams(prev);
      if (name === "search") {
        if (value.trim()) {
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

  // * clear all filters
  const handleClearFilters = () => {
    currentParams.delete("status");
    currentParams.delete("sortedby");
    currentParams.delete("search");
    setFilterParams(currentParams);
  };

  // * add two keys to facilitate the contracts filtering
  const processedProjects = useMemo(() => {
    return projects.map((project) => ({
      ...project,
      createdAtTimestamp: new Date(project.createdAt).getTime(),
      searchText: `${project.title} ${project.status}`.toLowerCase(),
    }));
  }, [projects]);

  // * filter projects before display them
  const filtredProjects = useMemo(() => {
    let res = [...processedProjects];
    if (status.trim()) {
      res = res.filter((project) => project.status === status);
    }

    if (search.trim()) {
      res = res.filter((project) =>
        project.searchText.includes(search.trim().toLowerCase()),
      );
    }

    if (sortedby === "newest") {
      res = res.sort((a, b) => b.createdAtTimestamp - a.createdAtTimestamp);
    } else if (sortedby === "oldest") {
      res = res.sort((a, b) => a.createdAtTimestamp - b.createdAtTimestamp);
    }
    return res;
  }, [processedProjects, status, search, sortedby]);

  // * inputs values
  const inputValues = {
    search: search,
    status: status,
    sortedby: sortedby,
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
          {filtredProjects.length ? (
            filtredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
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

export default ProjectsPage;
