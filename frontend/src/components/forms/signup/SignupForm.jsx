import { Link } from "react-router-dom";
import styles from "./signup.module.css";

function SignupForm() {
  return (
    <div className={styles.form_wrapper}>
      <h1>Create Account</h1>

      <form className={styles.form}>
        <div className={styles.row}>
          <div>
            <label>First Name</label>
            <input type="text" placeholder="Enter your first name" />
          </div>

          <div>
            <label>Last Name</label>
            <input type="text" placeholder="Enter your last name" />
          </div>
        </div>

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className={styles.full}
        />

        <div className={styles.row}>
          <div>
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>

          <div>
            <label>Confirm password</label>
            <input type="password" placeholder="Confirm your password" />
          </div>
        </div>

        <div className={styles.role}>
          <span>signup as :</span>

          <div>
            <input type="radio" name="role" id="freelancer" />
            <label htmlFor="freelancer">Freelancer</label>
          </div>

          <div>
            <input type="radio" name="role" id="client" />
            <label htmlFor="client">Client</label>
          </div>
        </div>

        <button className={styles.signup}>Sign up</button>

        <p className={styles.auth_switch}>
          <span>Already have an account ?</span>
          <Link to='/login'>
            <button className={styles.login}>log in</button>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignupForm;
