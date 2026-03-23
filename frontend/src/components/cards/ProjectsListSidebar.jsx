import { NavLink } from "react-router-dom";
import styles from "./ProjectsListSidebar.module.css";
import { isAction } from "@reduxjs/toolkit";

function ProjectsListSidebar({ projects, cur_project }) {
  const classes = {
    open: styles.open,
    "in review": styles.in_review,
    "in progress": styles.in_progress,
    completed: styles.completed,
    cancelled: styles.cancelled,
  };

  return (
    <div className={styles.projectsTitlesSection}>
      <h3 className={styles.projectsHeader}>Projects</h3>
      <div className={styles.projectsTitlesContainer}>
        {projects.map((project) => (
          <NavLink
            to={`/dashboard/client/proposals?project_id=${project.id}`}
            key={project.id}
            className={(_) =>
              +cur_project === project.id
                ? `${styles.projectTitleCard} ${styles.selected}`
                : `${styles.projectTitleCard}`
            }
          >
            <div className={styles.cardLeft}>
              <h4>{project.title}</h4>
              <p>Number of proposals : {project.proposalsCount}</p>
            </div>
            <div className={`${styles.cardRight} ${classes[project.status]}`}>
              <span className={styles.projectStatus}>{project.status}</span>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default ProjectsListSidebar;
