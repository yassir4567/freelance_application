import { NavLink } from "react-router-dom";
import { formatDate } from "../../../utils/helpers";
import styles from "../styles/FreelancerProjectCard.module.css";
import { useTranslation } from "react-i18next";

function FreelancerProjectCard({ project }) {
  const { t } = useTranslation();
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
            {t("browseProjects.card.posted")} : {formatDate(project.created_at)}
          </h6>
          <h2 className={styles.title}>{project.title}</h2>
        </div>
        <div className={styles.detailBtn}>
          <NavLink to={`../projects/${project.id}`} className={styles.btn}>
            {t("common.actions.viewDetail")}
          </NavLink>
        </div>
      </div>

      <div className={styles.main}>
        <p className={styles.description}>{shortedDescription}</p>

        <div className={styles.requirements}>
          <span>
            {t("common.labels.price")} : ${project.budget}
          </span>
          <span>|</span>
          <span>
            {t("common.labels.experienceLevel")} : {project.experience_level}
          </span>
          <span>|</span>
          <span>
            {t("common.labels.projectSize")} : {project.size}
          </span>
        </div>

        <div className={styles.skills}>
          {project.skills.map((skill) => (
            <div key={skill.id} className={styles.skill}>
              {skill.name}
            </div>
          ))}
        </div>

        <p className={styles.proposalsCount}>
          <span>{t("common.labels.proposals")} :</span>
          <span>{project.proposals_count}</span>
        </p>
      </div>
    </div>
  );
}

export default FreelancerProjectCard;
