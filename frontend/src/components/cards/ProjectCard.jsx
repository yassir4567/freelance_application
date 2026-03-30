import { NavLink } from "react-router-dom";
import styles from "./ProjectCard.module.css";

function ProjectCard({ project }) {

  const projectStatus = {
    open : styles.open , 
    in_review : styles.in_review , 
    in_progress : styles.in_progress , 
    completed : styles.completed , 
    cancelled : styles.cancelled 
  }
  return (
    <div className={styles.projectCard}>
      <div className={styles.leftProject}>
        <h3 className={styles.projectCardTitle}>
          {project.title[0].toUpperCase()}
          {project.title.slice(1)}
        </h3>
        <p className={styles.projectCardBudget}>Budget {project.budget}$ </p>
        <p className={styles.projectCardDate}>Created at {project.createdAt}</p>
        <p className={styles.projectCardCountProposals}>
          Number of proposals : {project.proposalsCount}
        </p>
      </div>
      <div className={styles.rightProject}>
        <p className={`${styles.projectCardStatus} ${projectStatus[project.status]}`}>
          {project.status[0].toUpperCase()}
          {project.status.slice(1).split("_").join(" ")}
        </p>
        <div className={styles.projectCardActions}>
          <NavLink to={`${project.id}`} className={`${styles.projectCardBtn}`}>
            View details
          </NavLink>
          <NavLink
            to={`${project.id}/proposals`}
            className={`${styles.projectCardBtn}`}
          >
            View proposals
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
