import styles from "../styles/RecentProjectsTable.module.css";
import { getRelativeTime } from "../../../utils/helpers";
function RecentProjectsTable({ projects }) {
  const statusClasses = {
    open: "status-success",
    "in review": "status-info",
    "in progress": "status-warning",
    completed: "status-purple",
    cancelled: "status-danger",
  };
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Number of Proposals</th>
          <th>Time</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects?.map((project) => (
          <tr key={project.id}>
            <td>{project.title}</td>
            <td>
              <span
                className={`${styles.status} ${statusClasses[project.status]}`}
              >
                {project.status.split("_").join(" ")}
              </span>
            </td>
            <td>{project.proposals_count}</td>
            <td>{getRelativeTime(project.created_at)}</td>
            <td className={styles.actions}>
              <button className={styles.actionBtn}>View Details</button>
              <button className={styles.actionBtn}>View Proposals</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RecentProjectsTable;
