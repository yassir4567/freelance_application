import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "../styles/Signup.module.css";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

function SignupPage() {
  const { user, register } = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState();

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

  const handleInputsChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    let newErrors = {};
    if (form.first_name.trim().length > 25) {
      newErrors.first_name = "First name must be < 25 letter";
    }

    if (form.last_name.trim().length > 25) {
      newErrors.last_name = "last name must be < 25 letter";
    }

    if (form.password.trim().length < 8) {
      newErrors.password = "password must be +8 length";
    }

    if (
      form.password.trim().length >= 8 &&
      form.password_confirmation !== form.password
    ) {
      newErrors.password_confirmation = "confirm password doesn't match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await register(form);
    
    if (!result.success) {
      setGeneralError(result.message);
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
      <h1>Create Account</h1>
      {generalError && <p className={styles.error}>{generalError}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <div>
            <label className={styles.label}>First Name</label>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleInputsChange}
              className={styles.input}
              placeholder="Enter your first name"
              required
            />
            {errors.first_name && (
              <p className={styles.error}>{errors.first_name}</p>
            )}
          </div>

          <div>
            <label className={styles.label}>Last Name</label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleInputsChange}
              className={styles.input}
              placeholder="Enter your last name"
              required
            />
            {errors.last_name && (
              <p className={styles.error}>{errors.last_name}</p>
            )}
          </div>
        </div>

        <div className={styles.full}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInputsChange}
            className={`${styles.input}`}
            placeholder="Enter your email"
            required
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>

        <div className={styles.row}>
          <div>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleInputsChange}
              className={styles.input}
              placeholder="Enter your password"
              required
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>

          <div>
            <label className={styles.label}>Confirm password</label>
            <input
              type="password"
              name="password_confirmation"
              value={form.password_confirmation}
              onChange={handleInputsChange}
              className={styles.input}
              placeholder="Confirm your password"
              required
            />
            {errors.password_confirmation && (
              <p className={styles.error}>{errors.password_confirmation}</p>
            )}
          </div>
        </div>

        <div className={styles.role}>
          <span>Signup as :</span>

          <div>
            <input
              type="radio"
              id="freelancer"
              name="role"
              value="freelancer"
              onChange={handleInputsChange}
              className={styles.input}
              required
            />
            <label className={styles.label} htmlFor="freelancer">
              Freelancer
            </label>
          </div>

          <div>
            <input
              type="radio"
              id="client"
              name="role"
              value="client"
              onChange={handleInputsChange}
              className={styles.input}
              required
            />
            <label className={styles.label} htmlFor="client">
              Client
            </label>
          </div>
          {errors.role && (
            <p className={`${styles.error} ${styles.roleError}`}>
              {errors.role}
            </p>
          )}
        </div>

        <button className={styles.signup}>Sign up</button>

        <p className={styles.auth_switch}>
          <span>Already have an account ?</span>
          <Link to="/login">
            <button className={styles.login}>log in</button>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignupPage;
