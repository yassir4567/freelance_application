import UserHeader from "../components/layout/UserHeader";
import { Outlet } from "react-router-dom";
import styles from "./ClientLayout.module.css";

function ClientLayout() {
  const links = [
    {
      label: "Home",
      to: "/dashboard/client",
    },
    {
      label: "Post Job",
      to: "/dashboard/client/postjob",
    },
    {
      label: "Projects and Proposals",
      to: "/dashboard/client/projects",
    },
    {
      label: "Contracts",
      to: "/dashboard/client/contracts",
    },
    {
      label: "Messages",
      to: "/dashboard/client/messages",
    },
  ];
  return (
    <div className={styles.container}>
      <UserHeader links={links}/>
      <div className={styles.client_content}>
        <Outlet />
      </div>
    </div>
  );
}

export default ClientLayout;
