import styles from "../styles/RecentProjectsTable.module.css";
import { getRelativeTime } from "../../../utils/helpers";
function RecentProjectsTable({ projects }) {
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
          <th>Title</th>
          <th>Status</th>
          <th className={styles.numberProposalTr}>Number of Proposals</th>
          <th>Time</th>
          <th>Actions</th>
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
                <button className={styles.actionBtn}>View Details</button>
                <button className={styles.actionBtn}>View Proposals</button>
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
