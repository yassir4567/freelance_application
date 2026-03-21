import styles from "./RecentProjectsTable.module.css";

function RecentProjectsTable({ projects }) {
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
            <td>{project.status}</td>
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
