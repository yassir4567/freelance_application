import { useEffect, useState } from "react";
import { getDashboardStats } from "../../../api/admin/getDashboardStats";
import DashboardCards from "../components/DashboardCards";
import styles from "../styles/AdminDashboardPage.module.css";

function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboardStats = async () => {
      setLoading(true);
      setError("");

      const result = await getDashboardStats();

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
        <p>Live platform numbers</p>
        <h1>Dashboard overview</h1>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {loading ? (
        <p className={styles.state}>Loading dashboard stats...</p>
      ) : (
        <DashboardCards dashboardData={dashboardData} />
      )}
    </div>
  );
}

export default AdminDashboard;
