import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import styles from "../styles/ProjectLayout.module.css";
import { useTranslation } from "react-i18next";
import useProject, { type ProjectHookType } from "../hooks/useProject";
import type { ClientProject } from "../../../types/project.types";
import type { Freelancer } from "../../../types/user.types";
import type { Category } from "../../../types/category.type";
import type { Skill } from "../../../types/skill.type";

export type AssignedFreelancerType = Pick<
  Freelancer,
  "id" | "user_id" | "first_name" | "last_name" | "title"
> & {
  category: Category;
  skills: Skill[];
};

export type ClientProjectDataType = {
  project: ClientProject;
  freelancer?: AssignedFreelancerType;
};

function ProjectLayout() {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const { project, isLoading, error }: ProjectHookType<ClientProjectDataType> =
    useProject<ClientProjectDataType>(projectId!, "client");

  // ! just for now
  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (!project) {
    return <p>Project not found</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const projectData: ClientProject = project.project;
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
