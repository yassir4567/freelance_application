import FreelancerProjectCard from "../components/FreelancerProjectCard";
import FreelancerProjectsFilter from "../components/FreelancerProjectsFilter";
import FreelancerProjectsHeaderFilter from "../components/FreelancerProjectsHeaderFilter";
import Search from "../../../shared/ui/Search";
import styles from "../styles/BrowseProjectsPage.module.css";
import { useTranslation } from "react-i18next";
import useBrowseProjectsFilters, {
  type BrowseProjectsFilters,
} from "../hooks/useBrowseProjectsFilters";
import useCategories, {
  type CategoryHookType,
} from "../../../hooks/useCategories";
import useBrowseProjects, {
  type BrowseProjectsHookType,
} from "../hooks/useBrowseProjects";

function BrowseProjectsPage() {
  const { t } = useTranslation();
  const {
    filters,
    searchParams,
    handleApplyFilters,
    handleClearAllFilters,
    handleInputsChange,
  }: BrowseProjectsFilters = useBrowseProjectsFilters();

  const {
    projects,
    isLoading: isProjectsLoading,
    error: projectsError,
  }: BrowseProjectsHookType = useBrowseProjects(searchParams);

  const {
    categories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  }: CategoryHookType = useCategories();

  if (isProjectsLoading || isCategoriesLoading) {
    return <p>Loading ...</p>;
  }

  if (projectsError) {
    return <p>{projectsError}</p>;
  }

  if (categoriesError) {
    return <p>{categoriesError}</p>;
  }

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
