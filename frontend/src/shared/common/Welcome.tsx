import styles from "./Welcome.module.css";

type WelcomeProps = {
  welcome: string;
  min_description: string;
};
function Welcome({ welcome, min_description }: WelcomeProps) {
  return (
    <div className={styles.welcomeContent}>
      <h1 className="pageTitle">{welcome}</h1>
      <h3 className={styles.welcomeSubTitle}>{min_description}</h3>
    </div>
  );
}

export default Welcome;
