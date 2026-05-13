import styles from "../styles/AssignedFreelancerCard.module.css";
import profile from "../../../assets/images/profile.png";
import { FiExternalLink, FiMessageSquare, FiTag, FiUserCheck } from "react-icons/fi";

function AssignedFreelancerCard({ freelancer }) {
  const skills =
    freelancer?.skills?.map((sk) => ({ id: sk.id, name: sk.name })) || [];
  const fullName = freelancer?.user
    ? `${freelancer.user.first_name} ${freelancer.user.last_name}`
    : "Assigned freelancer";

  return (
    <div className={styles.freelancerCard}>
      <div className={styles.freelancerCardHeader}>
        <div className={styles.profileBlock}>
          <div className={styles.avatarWrap}>
            <img src={profile} alt="freelancer image" className={styles.avatar} />
          </div>
          <div className={styles.freelancerInfo}>
            <span className={styles.assignedBadge}>
              <FiUserCheck />
              Assigned
            </span>
            <h3 className={styles.freelancerFullName}>{fullName}</h3>
            <p className={styles.freelancerTitle}>
              {freelancer?.title || "Freelancer"}
            </p>
          </div>
        </div>

        <div className={styles.freelancerCardActions}>
          <button className={styles.viewMessagesBtn}>
            <FiMessageSquare />
            View messages
          </button>
        </div>
      </div>

      <div className={styles.freelancerCardMain}>
        <div className={styles.freelancerCategory}>
          <span className={styles.categoryIcon}>
            <FiTag />
          </span>
          {freelancer?.category?.name || "No category"}
        </div>
        <div className={styles.freelancerSkills}>
          {skills.length > 0 ? (
            skills.map((skill) => (
              <div key={skill.id} className={styles.freelancerSkill}>
                {skill.name}
              </div>
            ))
          ) : (
            <div className={styles.emptySkills}>No skills listed yet</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssignedFreelancerCard;
