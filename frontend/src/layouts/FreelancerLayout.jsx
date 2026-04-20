import { Outlet } from "react-router-dom";
import UserHeader from "../shared/layout/UserHeader";
import styles from "./FreelancerLayout.module.css";
function FreelancerLayout() {
  const links = [
    {
      label: "Home",
      to: "/dashboard/freelancer",
    },
    {
      label: "Find projects",
      to: "/dashboard/freelancer/find-project",
    },
    {
      label: "My Proposals",
      to: "/dashboard/freelancer/my-proposals",
    },
    {
      label: "Contracts",
      to: "/dashboard/freelancer/contracts",
    },
    {
      label: "Messages",
      to: "/dashboard/freelancer/messages",
    },
  ];

  return (
    <div className={styles.container}>
      <UserHeader links={links} />
      <div className={styles.freelancer_content}>
        <Outlet />
      </div>
    </div>
  );
}

export default FreelancerLayout;
