import FreelancerProjectCard from "../components/FreelancerProjectCard";
import FreelancerProjectsFilter from "../components/FreelancerProjectsFilter";
import FreelancerProjectsHeaderFilter from "../components/FreelancerProjectsHeaderFilter";
import Search from "../../../shared/ui/Search";
import styles from "../styles/BrowseProjectsPage.module.css";
import { useTranslation } from "react-i18next";
import { projectApi } from "../../../api/projects/projectApi";
import { categoryApi } from "../../../api/categories/categoryApi";
import useBrowseProjectsFilters from "../hooks/useBrowseProjectsFilters";
import useBrowseProjects from "../hooks/useBrowseProjects";
import useCategories from "../../../hooks/useCategories";

function BrowseProjectsPage() {
  const { t } = useTranslation();
  const {
    filters,
    searchParams,
    handleApplyFilters,
    handleClearAllFilters,
    handleInputsChange,
  } = useBrowseProjectsFilters();

  const { projects } = useBrowseProjects(searchParams);

  const { categories } = useCategories();

  return (
    <div className={styles.findProjectPage}>
      <h1 className="pageTitle">{t("browseProjects.title")}</h1>
      <div className={styles.searchBox}>
        <div className={styles.search}>
          <Search value={filters.search} onChange={handleInputsChange} />
        </div>
        <button className={styles.clearAll} onClick={handleApplyFilters}>
          {t("common.actions.applyFilters")}
        </button>
        <button className={styles.clearAll} onClick={handleClearAllFilters}>
          {t("common.actions.clearAll")}
        </button>
      </div>

      <div className={styles.main}>
        <div className={styles.filters}>
          <FreelancerProjectsFilter
            filters={filters}
            onChange={handleInputsChange}
          />
        </div>
        <div className={styles.projectsSection}>
          <div className={styles.headerFilter}>
            <FreelancerProjectsHeaderFilter
              filters={filters}
              onChange={handleInputsChange}
              categories={categories}
            />
          </div>

          <div className={styles.projects}>
            {projects.length > 0 ? (
              projects.map((project) => (
                <FreelancerProjectCard key={project.id} project={project} />
              ))
            ) : (
              <div className={styles.empty}>
                {t("ui.states.noProjectsFound")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrowseProjectsPage;
