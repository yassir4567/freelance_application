import styles from "../styles/AssignedFreelancerCard.module.css";
import profile from "../../../assets/images/profile.png";
import { NavLink } from "react-router-dom";

function AssignedFreelancerCard() {
  const skills = ["React", "Laravel", "MySql"];
  return (
    <div className={styles.freelancerCard}>
      <div className={styles.freelancerCardHeader}>
        <img src={profile} alt="freelancer image" className={styles.avatar} />
        <div className={styles.freelancerInfo}>
          <h3 className={styles.freelancerFullName}>Full Name</h3>
          <p className={styles.freelancerTitle}>
            Full Stack developer with React & Laravel
          </p>
        </div>
      </div>

      <div className={styles.freelancerCardMain}>
        <div className={styles.freelancerCategory}>Full stack developer</div>
        <div className={styles.freelancerSkills}>
          {skills.map((skill) => (
            <div key={skill} className={styles.freelancerSkill}>
              {skill}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.freelancerCardActions}>
        <button className={styles.viewMessagesBtn}>View messages</button>
        <button className={styles.viewDetailsBtn}>view details</button>
      </div>
    </div>
  );
}

export default AssignedFreelancerCard;
