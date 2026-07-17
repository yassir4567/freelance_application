import styles from "../styles/ClientProjectsPage.module.css";
import { PiEmptyBold } from "react-icons/pi";
import ClientProjectCard from "../components/ClientProjectCard";
import FilterBox from "../../../shared/common/filters/FilterBox";
import { useTranslation } from "react-i18next";
import useProjects, { type ProjectsHookType } from "../hooks/useProjects";
import useClientProjectsFilters, {
  type ClientProjectFilters,
} from "../hooks/useClientProjectsFilters";
import type {
  ClientProject,
  ProjectStatus,
} from "../../../types/project.types";

function ClientProjectsPage() {
  const { t } = useTranslation();

  const {
    searchParams,
    inputValues,
    handleInputsChange,
    handleClearFilters,
  }: ClientProjectFilters = useClientProjectsFilters();

  const { projects, isLoading, error }: ProjectsHookType<ClientProject> =
    useProjects<ClientProject>(searchParams, "client");

  const statusValues: ProjectStatus[] = [
    "open",
    "in_progress",
    "in_review",
    "completed",
    "cancelled",
  ];

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
 
  return (
    <div className={styles.projectsPage}>
      <h1 className="pageTitle">{t("clientProjects.title")}</h1>
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
          {projects.length > 0 ? (
            projects.map((project: ClientProject) => (
              <ClientProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className={styles.empty}>
              <p className={styles.emptyMsg}>{t("ui.states.emptyProjects")}</p>
              <PiEmptyBold className={styles.emptyIcon} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientProjectsPage;
