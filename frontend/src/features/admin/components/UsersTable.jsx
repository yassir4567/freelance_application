import styles from "../styles/UsersTable.module.css";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

function UsersTable({ users }) {
  const { t } = useTranslation();

  if (users.length === 0) {
    return <p className={styles.empty}>{t("ui.states.noUsersFound")}</p>;
  }

  return (
    <div className={styles.tableBox}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>{t("common.labels.fullName")}</th>
            <th>{t("ui.labels.email")}</th>
            <th>Role</th>
            <th>{t("ui.labels.location")}</th>
            <th>{t("ui.labels.phone")}</th>
            <th>{t("common.labels.actions")}</th>
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
              <td>{user.city || user.country || t("ui.fallbacks.notAdded")}</td>
              <td>{user.phone || t("ui.fallbacks.notAdded")}</td>
              <td>
                <NavLink to={`/dashboard/admin/users/${user.id}`}>
                  <button className={styles.viewBtn}>{t("common.actions.viewDetails")}</button>
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
