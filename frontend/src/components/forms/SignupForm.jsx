import { Link } from "react-router-dom";
import styles from "./signup.module.css";

function SignupForm() {
  return (
    <div className={styles.form_wrapper}>
      <h1>Create Account</h1>

      <form className={styles.form}>
        <div className={styles.row}>
          <div>
            <label className={styles.label} >First Name</label>
            <input className={styles.input}  type="text" placeholder="Enter your first name" />
          </div>

          <div>
            <label className={  styles.label} >Last Name</label>
            <input className={styles.input}  type="text" placeholder="Enter your last name" />
          </div>
        </div>

        <label className={styles.label} >Email</label>
        <input className={`${styles.input} ${styles.full}`} 
          type="email"
          placeholder="Enter your email"
        />

        <div className={styles.row}>
          <div>
            <label className={styles.label} >Password</label>
            <input className={styles.input}  type="password" placeholder="Enter your password" />
          </div>

          <div>
            <label className={styles.label} >Confirm password</label>
            <input className={styles.input}  type="password" placeholder="Confirm your password" />
          </div>
        </div>

        <div className={styles.role}>
          <span>signup as :</span>

          <div>
            <input className={styles.input}  type="radio" name="role" id="freelancer" />
            <label className={styles.label}  htmlFor="freelancer">Freelancer</label>
          </div>

          <div>
            <input className={styles.input}  type="radio" name="role" id="client" />
            <label className={styles.label}  htmlFor="client">Client</label>
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
