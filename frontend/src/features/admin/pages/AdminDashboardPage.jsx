import { useEffect, useState } from "react";
import DashboardCards from "../components/DashboardCards";
import styles from "../styles/AdminDashboardPage.module.css";
import { useTranslation } from "react-i18next";
import { dashboardApi } from "../../../api/dashboard/dashboardApi";

function AdminDashboard() {
  const { t } = useTranslation();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboardStats = async () => {
      setLoading(true);
      setError("");

      const result = await dashboardApi.getDashboardData('admin');

      if (result.success) {
        setDashboardData(result.data);
      } else {
        setDashboardData(null);
        setError(result.message);
      }

      setLoading(false);
    };

    loadDashboardStats();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.pageTitle}>
        <p>{t("admin.dashboard.subtitle")}</p>
        <h1>{t("admin.dashboard.title")}</h1>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {loading ? (
        <p className={styles.state}>{t("ui.states.loadingDashboardStats")}</p>
      ) : (
        <DashboardCards dashboardData={dashboardData} />
      )}
    </div>
  );
}

export default AdminDashboard;
