import { Outlet } from "react-router-dom";
import AdminSideBar from "../shared/layout/AdminSideBar";
import AdminHeader from "../shared/layout/AdminHeader";
import styles from "./AdminLayout.module.css"


function AdminLayout() {
  return (
    <div className={styles.admin_wrapper}>
      <div className={styles.side}>
        <AdminSideBar/>
      </div>
      <div className={styles.main}>
        <AdminHeader />
         <Outlet />
      </div>
     
    </div>
  );
}

export default AdminLayout;
