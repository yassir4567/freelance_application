import { NavLink } from "react-router-dom";
import { formatDate } from "../../../utils/helpers";
import styles from "../styles/FreelancerProjectCard.module.css";

function FreelancerProjectCard({ project }) {
  let shortedDescription;

  if (project.description.split(" ").length > 40) {
    shortedDescription = (
      <>
        {project.description.split(" ").slice(0, 40).join(" ")}
        <span className={styles.more}> more...</span>
      </>
    );
  } else {
    shortedDescription = project.description;
  }

  return (
    <div className={styles.projectCard}>
      <div className={styles.cardHeader}>
        <div className={styles.headerLeft}>
          <h6 className={styles.postedDate}>
            Posted : {formatDate(project.created_at)}
          </h6>
          <h2 className={styles.title}>{project.title}</h2>
        </div>
        <div className={styles.detailBtn}>
          <NavLink to={`../projects/${project.id}`} className={styles.btn}>
            View detail
          </NavLink>
        </div>
      </div>

      <div className={styles.main}>
        <p className={styles.description}>{shortedDescription}</p>

        <div className={styles.requirements}>
          <span>Price : ${project.budget}</span>
          <span>|</span>
          <span>Experience level : {project.experience_level}</span>
          <span>|</span>
          <span>Size : {project.size}</span>
        </div>

        <div className={styles.skills}>
          {project.skills.map((skill) => (
            <div key={skill.id} className={styles.skill}>
              {skill.name}
            </div>
          ))}
        </div>

        <p className={styles.proposalsCount}>
          <span>Proposals :</span>
          <span>{project.proposals_count}</span>
        </p>
      </div>
    </div>
  );
}

export default FreelancerProjectCard;
