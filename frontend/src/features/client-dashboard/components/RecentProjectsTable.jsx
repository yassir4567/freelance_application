import styles from "../styles/RecentProjectsTable.module.css";
import { getRelativeTime } from "../../../utils/helpers";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

function RecentProjectsTable({ projects }) {
  const { t } = useTranslation();
  const statusClasses = {
    open: "status-success",
    in_review: "status-info",
    in_progress: "status-warning",
    completed: "status-purple",
    cancelled: "status-danger",
  };

  const hasProjects = projects?.length;
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>{t("common.labels.title")}</th>
          <th>{t("common.labels.status")}</th>
          <th className={styles.numberProposalTr}>
            {t("common.labels.numberOfProposals")}
          </th>
          <th>{t("dashboard.client.table.thead.time")}</th>
          <th>{t("common.labels.actions")}</th>
        </tr>
      </thead>
      <tbody>
        {hasProjects ? (
          projects?.map((project) => (
            <tr key={project.id}>
              <td className={styles.titleCell}>
                <span>{project.title}</span>
              </td>
              <td>
                <span
                  className={`${styles.status} ${statusClasses[project.status]}`}
                >
                  {project.status.split("_").join(" ")}
                </span>
              </td>
              <td className={styles.numberProposalTd}>
                <span>{project.proposals_count}</span>
              </td>
              <td>{getRelativeTime(project.created_at)}</td>
              <td className={styles.actions}>
                <NavLink
                  to={`projects/${project.id}`}
                  className={styles.actionBtn}
                >
                  View Details
                </NavLink>
                <NavLink
                  to={`projects/${project.id}/proposals`}
                  className={styles.actionBtn}
                >
                  View Proposals
                </NavLink>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className={styles.empty}>
              You don't have active contracts yet
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default RecentProjectsTable;
