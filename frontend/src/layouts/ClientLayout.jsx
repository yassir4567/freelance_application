import UserHeader from "../components/layout/UserHeader";
import { Outlet } from "react-router-dom";
import styles from './ClientLayout.module.css'

function ClientLayout() {
  return (
    <div className={styles.container}>
      <UserHeader />
      <div className={styles.client_content}>
        <Outlet />
      </div>
    </div>
  );
}

export default ClientLayout;
