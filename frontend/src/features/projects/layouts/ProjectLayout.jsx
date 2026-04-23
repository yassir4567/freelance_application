import {
  Navigate,
  NavLink,
  Outlet,
  useNavigate,
  useParams,
} from "react-router-dom";
import styles from "../styles/ProjectLayout.module.css";
import { getClientProjectDetail } from "../../../api/projects/getClientProjectDetail";
import { useEffect, useState } from "react";

function ProjectLayout() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [project, setProject] = useState();

  useEffect(() => {
    const loadProject = async () => {
      const result = await getClientProjectDetail(projectId);
      if (!result.success) {
        navigate("/dashboard/client/projects");
      }
      setProject(result.data);
    };
    loadProject();
  }, []);

  return (
    <div className={styles.projectLayout}>
      <div className={styles.projectLayoutHeader}>
        <h1 className={styles.projectTitle}>
          {project?.title[0].toUpperCase()}
          {project?.title.slice(1)}
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
          <NavLink
            to={`/dashboard/client/projects`}
            className={styles.toAllProjects}
          >
            all projects
          </NavLink>
        </div>
      </div>
      <div>
        <Outlet context={{ project }} />
      </div>
    </div>
  );
}

export default ProjectLayout;
