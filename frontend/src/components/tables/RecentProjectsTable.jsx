import styles from "./RecentProjectsTable.module.css";

function RecentProjectsTable({ projects }) {
  const statusClasses = {
    open: "status-success",
    in_review: "status-info",
    in_progress: "status-warning",
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
        {projects.map((project) => (
          <tr key={project.id}>
            <td>{project.title}</td>
            <td>
              <span className={`${styles.status} ${statusClasses[project.status]}`}>
                {project.status.split("_").join(" ")}
              </span>
            </td>
            <td>{project.proposals}</td>
            <td>{project.time}</td>
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
