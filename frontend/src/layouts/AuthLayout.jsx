import styles from "./AuthLayout.module.css";
import { Outlet } from "react-router-dom";
import Logo from "../components/common/Logo";

function AuthLayout() {
  return (
    <div className={styles.wrapper}>
      <Logo />
      <div className={styles.form_card}>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
