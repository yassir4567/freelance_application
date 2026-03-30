import { NavLink, Outlet, useParams } from "react-router-dom";
import styles from "./ProjectLayout.module.css";
import { projects } from "../api/projects";

function ProjectLayout() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === +projectId);
  if (!project) return <h1>Not found</h1>;

  return (
    <div>
      <div className={styles.projectLayoutHeader}>
        <h1 className={styles.projectTitle}>
          {project.title[0].toUpperCase()}
          {project.title.slice(1)}
        </h1>
        <div className={styles.quickLinks}>
          <NavLink
            to={``}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : `${styles.link}`
            }
            end
          >
            View project detail
          </NavLink>
          <NavLink
            to={`proposals`}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : `${styles.link}`
            }
            end
          >
            view proposals
          </NavLink>
          <NavLink to={`/dashboard/client/projects`} className={styles.toAllProjects}>all projects</NavLink>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default ProjectLayout;
