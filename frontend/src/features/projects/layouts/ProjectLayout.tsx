import { NavLink, Outlet, useParams } from "react-router-dom";
import styles from "../styles/ProjectLayout.module.css";
import { useTranslation } from "react-i18next";
import type { ClientProjectList, Project } from "../../../types/project.types";
import type {
  AssignedFreelancerType,
  ClientProjectHookType,
} from "../hooks/useClientProject";
import useClientProject from "../hooks/useClientProject";

function ProjectLayout() {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const { project, isLoading, error }: ClientProjectHookType = useClientProject(
    projectId!,
  );

  // ! just for now
  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!project) {
    return <p>Project not found</p>;
  }
  
  const projectData: Project = project.project;
  let freelancer: AssignedFreelancerType | null = null;
  if (project.freelancer) {
    freelancer = project.freelancer;
  }

  return (
    <div className={styles.projectLayout}>
      <div className={styles.projectLayoutHeader}>
        <h1 className={styles.projectTitle}>{projectData.title}</h1>
        <div className={styles.quickLinks}>
          <NavLink
            to={``}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : `${styles.link}`
            }
            end
          >
            {t("common.actions.viewDetails")}
          </NavLink>
          <NavLink
            to={`proposals`}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : `${styles.link}`
            }
            end
          >
            {t("common.actions.viewProposals")}
          </NavLink>
          <NavLink
            to={`/dashboard/client/projects`}
            className={styles.toAllProjects ?? ""}
          >
            all projects
          </NavLink>
        </div>
      </div>
      <div>
        <Outlet context={{ project: project.project, freelancer }} />
      </div>
    </div>
  );
}

export default ProjectLayout;
