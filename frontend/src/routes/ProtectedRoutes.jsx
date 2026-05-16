import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

function ProtectedRoutes({ role }) {
  const { user, isLoading } = useAuth();
  const { t } = useTranslation();

  if (isLoading) {
    return <div>{t("ui.states.loading")}</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && role !== user.role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;
