
import { useTranslation } from "react-i18next";

function AdminProjectsPage() {
  const { t } = useTranslation();

  return <h1>{t("admin.projects.title")}</h1>;
}

export default AdminProjectsPage;
