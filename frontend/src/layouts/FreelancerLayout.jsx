import { Outlet } from "react-router-dom";
import UserHeader from "../shared/layout/UserHeader";
import styles from "./FreelancerLayout.module.css";
import { useTranslation } from "react-i18next";
function FreelancerLayout() {
  const { t } = useTranslation();
  const links = [
    {
      label: t("navbar.home"),
      to: "/dashboard/freelancer",
    },
    {
      label: t("navbar.findProject"),
      to: "/dashboard/freelancer/find-project",
    },
    {
      label: t("navbar.proposals"),
      to: "/dashboard/freelancer/my-proposals",
    },
    {
      label: t("navbar.contracts"),
      to: "/dashboard/freelancer/contracts",
    },
    {
      label: t("navbar.messages"),
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
