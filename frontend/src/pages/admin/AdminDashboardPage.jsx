import AdminCards from "../../components/cards/DashboardCards";
import styles from './AdminDashboardPage.module.css'

function AdminDashboard() {
    return (
        <div className={styles.container}>
            <AdminCards />
        </div>

    )
}

export default AdminDashboard;