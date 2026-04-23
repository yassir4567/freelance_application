import styles from "../styles/AssignedFreelancerCard.module.css";
import profile from "../../../assets/images/profile.png";
import { NavLink } from "react-router-dom";

function AssignedFreelancerCard({ freelancer }) {
  const skills = freelancer?.skills.map((sk) => ({ id: sk.id, name: sk.name }));

  return (
    <div className={styles.freelancerCard}>
      <div className={styles.freelancerCardHeader}>
        <img src={profile} alt="freelancer image" className={styles.avatar} />
        <div className={styles.freelancerInfo}>
          <h3 className={styles.freelancerFullName}>
            {freelancer.user.first_name} {freelancer.user.last_name}{" "}
          </h3>
          <p className={styles.freelancerTitle}>{freelancer.title}</p>
        </div>
      </div>

      <div className={styles.freelancerCardMain}>
        <div className={styles.freelancerCategory}>
          {freelancer.category.name}
        </div>
        <div className={styles.freelancerSkills}>
          {skills.map((skill) => (
            <div key={skill.id} className={styles.freelancerSkill}>
              {skill.name}
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
