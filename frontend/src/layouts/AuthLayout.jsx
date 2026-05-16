import styles from "./AuthLayout.module.css";
import { Link, NavLink, Outlet } from "react-router-dom";
import Logo from "../shared/common/Logo";

function AuthLayout() {
  return (
    <div className={styles.wrapper}>
      <Link to="/" className={styles.logo}>
        Freelancy
      </Link>
      <div className={styles.form_card}>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
