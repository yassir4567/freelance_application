import { useTranslation } from "react-i18next";

function HomePage() {
  const { t } = useTranslation();

  return <h1>{t("common.nav.home")}</h1>;
}

export default HomePage;
