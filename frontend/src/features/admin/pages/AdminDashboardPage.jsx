import AdminCards from "../components/DashboardCards";
import styles from "../styles/AdminDashboardPage.module.css";

function AdminDashboard() {
    return (
        <div className={styles.container}>
            <AdminCards />
        </div>

    )
}

export default AdminDashboard;
