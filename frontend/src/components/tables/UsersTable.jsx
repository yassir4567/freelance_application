import styles from "./UsersTable.module.css";
import { NavLink } from "react-router-dom";

function UsersTable({ filteredUsers }) {
  return (
    <table className={styles.table} border={1}>
      <thead>
        <tr>
          <th>id</th>
          <th>Full name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {filteredUsers.map((user) => (
          <tr key={user.id}>
            <td> {user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <NavLink to="/dashboard/admin/userdetails">
                <button className={styles.viewBtn}>👁 View</button>
              </NavLink>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default UsersTable;
