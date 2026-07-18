import { NavLink } from "react-router-dom";
import styles from "../styles/ClientProjectCard.module.css";
import { formatDate, formatSnakeCase } from "../../../utils/helpers";
import { useTranslation } from "react-i18next";
import type {
  ClientProjectList,
  ProjectStatus,
} from "../../../types/project.types";

type ClientProjectCardProps = {
  project: ClientProjectList;
};

function ClientProjectCard({ project }: ClientProjectCardProps) {
  const { t } = useTranslation();
  const projectStatus: Record<ProjectStatus, string> = {
    open: styles.open ?? "",
    in_review: styles.in_review ?? "",
    in_progress: styles.in_progress ?? "",
    completed: styles.completed ?? "",
    cancelled: styles.cancelled ?? "",
  };
  return (
    <div className={styles.projectCard}>
      <div className={styles.leftProject}>
        <h3 className={styles.projectCardTitle}>{project.title}</h3>
        <p className={styles.projectCardBudget}>
          {t("common.labels.budget")} {project.budget}
        </p>
        <p className={styles.projectCardDate}>
          {t("clientProjects.card.createdAt")} {formatDate(project.created_at)}
        </p>
        <p className={styles.projectCardCountProposals}>
          {t("common.labels.numberOfProposals")} {project.proposals_count}
        </p>
      </div>
      <div className={styles.rightProject}>
        <p
          className={`${styles.projectCardStatus} ${projectStatus[project.status]}`}
        >
          {formatSnakeCase(project.status)}
        </p>
        <div className={styles.projectCardActions}>
          <NavLink to={`${project.id}`} className={`${styles.projectCardBtn}`}>
            {t("common.actions.viewDetails")}
          </NavLink>
          <NavLink
            to={`${project.id}/proposals`}
            className={`${styles.projectCardBtn}`}
          >
            {t("common.actions.viewProposals")}
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default ClientProjectCard;
