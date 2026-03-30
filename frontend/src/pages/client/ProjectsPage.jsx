import { useEffect, useMemo, useState } from "react";
import styles from "./ProjectsPage.module.css";
import { CiSearch } from "react-icons/ci";
import { BiSolidRightArrow } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";
import ProjectCard from "../../components/cards/ProjectCard";
import { projects } from "../../api/projects";

const ALL_STATUS = [
  "open",
  "in_progress",
  "in_review",
  "completed",
  "cancelled",
];

function ProjectsPage() {
  const [filterParams, setFilterParams] = useSearchParams();

  // * get current query parameters from URL
  const currentParams = new URLSearchParams(filterParams);

  // * if filters box open
  const showFilters = currentParams.get("isopen") === "1";

  // * get query params
  const search = currentParams.get("search") || "";
  const sortedby = currentParams.get("sortedby") || "";
  const statusUrl = currentParams.getAll("status");
  const statuses = statusUrl.length ? statusUrl : ["all"];

  // * handle inputs changes
  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;

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
        if (value === "all") {
          nextParams.delete("status");
          return nextParams;
        }

        const currentStatus = nextParams.getAll("status");
        nextParams.delete("status");
        let updateStatus;

        if (checked) {
          updateStatus = [...currentStatus, value];
        } else {
          updateStatus = currentStatus.filter((status) => status !== value);
        }

        const hasAllStatus = ALL_STATUS.every((status) =>
          updateStatus.includes(status),
        );
        
        if (hasAllStatus || updateStatus.length === 0) {
          nextParams.delete("status");
          return nextParams;
        }

        updateStatus.forEach((status) => nextParams.append("status", status));

        return nextParams;
      }
    });
  };

  // * handle show filter box
  const handleShowFilter = () => {
    const isOpen = filterParams.get("isopen") === "1";
    if (!isOpen) {
      currentParams.set("isopen", 1);
    } else {
      currentParams.delete("isopen");
    }
    setFilterParams(currentParams);
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
    if (statuses.length > 0) {
      if (statuses.includes("all")) {
        res = res;
      } else {
        res = res.filter((project) => statuses.includes(project.status));
      }
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
  }, [processedProjects, statuses, search, sortedby]);

  return (
    <div className={styles.projectsPage}>
      <h1 className="pageTitle">All Projects Posts</h1>
      <div className={styles.projectsPageMain}>
        <div className={styles.projectsFilterSection}>
          <div className={styles.searchBox}>
            <CiSearch className={styles.searchIcon} size={25} />
            <input
              type="text"
              name="search"
              className={styles.searchInput}
              value={search}
              onChange={handleInputChange}
              placeholder="Search for projects by title ..."
            />
          </div>

          <div className={styles.filtersBox}>
            <div className={styles.filtersBoxHeader}>
              <div className={styles.filtersTitle} onClick={handleShowFilter}>
                <span>Filters</span>
                <BiSolidRightArrow
                  className={`${showFilters ? styles.rotateArrow : ""} ${styles.arrow}`}
                />
              </div>
              <button
                className={styles.clearFilters}
                onClick={handleClearFilters}
              >
                Clear all filters
              </button>
            </div>
            <div
              className={`${styles.filtersItems} ${showFilters ? styles.showFilters : ""}`}
            >
              <div className={styles.filterItem}>
                <p>Status</p>
                <div className={styles.filterBox}>
                  <input
                    type="checkbox"
                    name="status"
                    id="all"
                    value="all"
                    onChange={handleInputChange}
                    checked={statuses.includes("all")}
                  />
                  <label htmlFor="all">All</label>
                </div>
                <div className={styles.filterBox}>
                  <input
                    type="checkbox"
                    name="status"
                    id="open"
                    value="open"
                    onChange={handleInputChange}
                    checked={statuses.includes("open")}
                  />
                  <label htmlFor="open">Open</label>
                </div>
                <div className={styles.filterBox}>
                  <input
                    type="checkbox"
                    name="status"
                    id="in_progress"
                    value="in_progress"
                    onChange={handleInputChange}
                    checked={statuses.includes("in_progress")}
                  />
                  <label htmlFor="in_progress">In progress</label>
                </div>
                <div className={styles.filterBox}>
                  <input
                    type="checkbox"
                    name="status"
                    id="in_review"
                    value="in_review"
                    onChange={handleInputChange}
                    checked={statuses.includes("in_review")}
                  />
                  <label htmlFor="in_review">In review</label>
                </div>
                <div className={styles.filterBox}>
                  <input
                    type="checkbox"
                    name="status"
                    id="completed"
                    value="completed"
                    onChange={handleInputChange}
                    checked={statuses.includes("completed")}
                  />
                  <label htmlFor="completed">Completed</label>
                </div>
                <div className={styles.filterBox}>
                  <input
                    type="checkbox"
                    name="status"
                    id="cancelled"
                    value="cancelled"
                    onChange={handleInputChange}
                    checked={statuses.includes("cancelled")}
                  />
                  <label htmlFor="cancelled">Cancelled</label>
                </div>
              </div>
              <div className={styles.filterItem}>
                <p>Sort by</p>
                <div className={styles.filterBox}>
                  <input
                    type="radio"
                    name="sortedby"
                    id="newset first"
                    value="newest"
                    onChange={handleInputChange}
                    checked={sortedby === "newest"}
                  />
                  <label htmlFor="newset first">Newest first</label>
                </div>
                <div className={styles.filterBox}>
                  <input
                    type="radio"
                    name="sortedby"
                    id="oldest first"
                    value="oldest"
                    onChange={handleInputChange}
                    checked={sortedby === "oldest"}
                  />
                  <label htmlFor="oldest first">Oldest first</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.projectsSection}>
          {filtredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;
