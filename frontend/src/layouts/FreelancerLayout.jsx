import { Outlet } from "react-router-dom";
import UserHeader from "../shared/layout/UserHeader";
import styles from "./FreelancerLayout.module.css";
import { useTranslation } from "react-i18next";
function FreelancerLayout() {
  const { t } = useTranslation();
  const links = [
    {
      label: t("common.nav.home"),
      to: "/dashboard/freelancer",
    },
    {
      label: t("common.nav.findProject"),
      to: "/dashboard/freelancer/find-project",
    },
    {
      label: t("common.nav.proposals"),
      to: "/dashboard/freelancer/my-proposals",
    },
    {
      label: t("common.nav.contracts"),
      to: "/dashboard/freelancer/contracts",
    },
    {
      label: t("common.nav.messages"),
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
