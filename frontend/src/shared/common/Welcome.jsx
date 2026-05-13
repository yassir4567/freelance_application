import styles from "./Welcome.module.css";

function Welcome({ welcome, min_description }) {
  return (
    <div className={styles.welcomeContent}>
      <h1 className="pageTitle">{welcome}</h1>
      <h3 className={styles.welcomeSubTitle}>{min_description}</h3>
    </div>
  );
}

export default Welcome;
