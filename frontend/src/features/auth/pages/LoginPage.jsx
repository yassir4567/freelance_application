import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(form);

    if (!result.success) {
      setError(result.message);
      return;
    }

    if (result.user.role === "freelancer") {
      navigate("/dashboard/freelancer");
    } else if (result.user.role === "client") {
      navigate("/dashboard/client");
    } else {
      navigate("/dashboard/admin");
    }
  };

  return (
    <div className={styles.form_wrapper}>
      <h1>Login to your account</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Enter your email"
          required
        />

        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Enter your password"
          required
        />

        {error && <p className={styles.error}>{error}</p>}

        {/* <div className={styles.remember}>
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">remember me</label>
        </div> */}

        <button type="submit" className={styles.login}>
          Log in
        </button>

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

export default LoginPage;
