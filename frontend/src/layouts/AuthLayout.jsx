import styles from './AuthLayout.module.css'
import { Outlet} from "react-router-dom";


function AuthLayout() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.auth_logo}>
                Freelance Application
            </div>
            <div className={styles.form_card}>
                <Outlet />
            </div>
        </div>
    );
}

export default AuthLayout;