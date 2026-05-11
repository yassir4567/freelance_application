import { useEffect, useState } from "react";
import { getUsers } from "../../../api/admin/getUsers";
import styles from "../styles/AdminUsersPage.module.css";
import UsersTable from "../components/UsersTable";

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError("");

      const result = await getUsers({ role, search });

      if (result.success) {
        setUsers(result.data);
      } else {
        setUsers([]);
        setError(result.message);
      }

      setLoading(false);
    };

    loadUsers();
  }, [role, search]);

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <div>
          <p className={styles.subtitle}>Admin dashboard</p>
          <h1>Users</h1>
        </div>
        <span className={styles.count}>{users.length} users</span>
      </div>

      <div className={styles.filters}>
        <div className={styles.field}>
          <label htmlFor="user-search">Search by name</label>
          <input
            id="user-search"
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="role-filter">Role</label>
          <select
            id="role-filter"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">All users</option>
            <option value="client">Client</option>
            <option value="freelancer">Freelancer</option>
          </select>
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {loading ? (
        <p className={styles.state}>Loading users...</p>
      ) : (
        <UsersTable users={users} />
      )}
    </div>
  );
}

export default AdminUsersPage;
