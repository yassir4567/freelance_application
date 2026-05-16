import { Link, Navigate, useNavigate } from "react-router-dom";
import { FiLogIn, FiUserPlus } from "react-icons/fi";
import styles from "../styles/HomePage.module.css";
import { useAuth } from "../../../context/AuthContext";
import Logo from "../../../shared/common/Logo";

function HomePage() {
  const { user } = useAuth();

  // * if user already logged in redirect him to his dashboard
  if (user) {
    if (user.role === "freelancer") {
      return <Navigate to="/dashboard/freelancer" />;
    } else if (user.role === "client") {
      return <Navigate to="/dashboard/client" />;
    } else {
      return <Navigate to="/dashboard/admin" />;
    }
  }
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          Freelancy
        </Link>
        <nav className={styles.actions}>
          <Link to="/login" className={`${styles.action} ${styles.login}`}>
            <FiLogIn />
            <span>Login</span>
          </Link>
          <Link to="/signup" className={`${styles.action} ${styles.signup}`}>
            <FiUserPlus />
            <span>Signup</span>
          </Link>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.kicker}>Freelance work, simplified</p>
            <h1>Connect with skilled freelancers and build projects faster.</h1>
            <p className={styles.description}>
              Freelancy brings clients and independent talent together in one
              focused workspace. Post opportunities, discover trusted experts,
              and move from first conversation to finished work with confidence.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
