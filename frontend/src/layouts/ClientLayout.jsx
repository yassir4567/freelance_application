import UserHeader from "../shared/layout/UserHeader";
import { Outlet } from "react-router-dom";
import styles from "./ClientLayout.module.css";
import { useTranslation } from "react-i18next";

function ClientLayout() {
  const { t } = useTranslation();

  const links = [
    {
      label: t("navbar.home"),
      to: "/dashboard/client",
    },
    {
      label: t("navbar.postproject"),
      to: "/dashboard/client/postjob",
    },
    {
      label: t("navbar.projects&proposals"),
      to: "/dashboard/client/projects",
    },
    {
      label: t("navbar.contracts"),
      to: "/dashboard/client/contracts",
    },
    {
      label: t("navbar.messages"),
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
