import { Link } from "react-router-dom";
import styles from "./login.module.css";

function LoginForm() {
  return (
    <div className={styles.form_wrapper}>
      <h1>Login to your account</h1>
      <form className={styles.form}>
        <input type="email" placeholder="Enter your email" />

        <input type="password" placeholder="Enter your password" />

        <div className={styles.remember}>
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">remember me</label>
        </div>
        <button className={styles.login}>Log in</button>

        <p className={styles.auth_switch}>
          <span>Don’t have an account ?</span>

          <Link to="/signup">
            <button className={styles.signup}>signup</button>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
