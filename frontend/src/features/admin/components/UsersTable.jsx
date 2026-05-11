import styles from "../styles/UsersTable.module.css";
import { NavLink } from "react-router-dom";

function UsersTable({ users }) {
  if (users.length === 0) {
    return <p className={styles.empty}>No users found.</p>;
  }

  return (
    <div className={styles.tableBox}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Location</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>#{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span className={styles.role}>{user.role}</span>
              </td>
              <td>{user.city || user.country || "Not added"}</td>
              <td>{user.phone || "Not added"}</td>
              <td>
                <NavLink to={`/dashboard/admin/users/${user.id}`}>
                  <button className={styles.viewBtn}>View</button>
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default UsersTable;
