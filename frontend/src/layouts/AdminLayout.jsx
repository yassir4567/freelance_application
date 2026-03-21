import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/layout/AdminSideBar";
import AdminHeader from "../components/layout/AdminHeader";

function AdminLayout() {
  return (
    <div className="admin_wrapper">
      <div>
        <AdminSideBar />
      </div>
      <div>
        <AdminHeader />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
