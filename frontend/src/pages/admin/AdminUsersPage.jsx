import { useState } from "react";
import styles from "./AdminUsersPage.module.css";
import UsersTable from "../../components/tables/UsersTable";


function AdminUsersPage() {
  const [users] = useState([
    { id: 1, name: "Ali", email: "ali@test.com", role: "Admin" },
    { id: 2, name: "Sara", email: "sara@test.com", role: "User" },
  ]);

  const [search, setSearch] = useState("");

  // 🔍 Search
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className={styles.content}>
      <h1>Users</h1>
      {/* Top */}
      <div className={styles.topBar}>
        <input
          type="text"
          placeholder="Search"
          className={styles.search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      
      <UsersTable filteredUsers={filteredUsers} />
    </div>
  );
}

export default AdminUsersPage;
