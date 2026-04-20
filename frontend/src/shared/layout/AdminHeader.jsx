import styles from "./AdminHeader.module.css";

function AdminHeader() {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div>
          <h2>Welcome, Belkassmi Mohamed</h2>
        </div>

        <div className={styles.profile}>
          <img
            src="https://m.media-amazon.com/images/I/81PGwdUf0OL._AC_UF894,1000_QL80_.jpg"
            alt="admin"
            className={styles.avatar}
          />
          <span>belkassmi</span>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
