import UserHeader from "../shared/layout/UserHeader";
import { Outlet } from "react-router-dom";
import styles from "./ClientLayout.module.css";
import { useTranslation } from "react-i18next";

function ClientLayout() {
  const { t } = useTranslation();

  const links = [
    {
      label: t("common.nav.home"),
      to: "/dashboard/client",
    },
    {
      label: t("common.nav.postProject"),
      to: "/dashboard/client/postjob",
    },
    {
      label: t("common.nav.projectsAndProposals"),
      to: "/dashboard/client/projects",
    },
    {
      label: t("common.nav.contracts"),
      to: "/dashboard/client/contracts",
    },
    {
      label: t("common.nav.messages"),
      to: "/dashboard/client/messages",
    },
  ];
  return (
    <div className={styles.container}>
      <UserHeader links={links} />
      <div className={styles.client_content}>
        <Outlet />
      </div>
    </div>
  );
}

export default ClientLayout;
