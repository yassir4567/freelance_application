import { useTranslation } from "react-i18next";

function UnauthorizedPage() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("ui.states.pageUnavailable")}</h1>
      <p>{t("ui.states.pageUnavailableTitle")}</p>
    </div>
  );
}

export default UnauthorizedPage;
