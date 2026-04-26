import { NavLink } from "react-router-dom";
import styles from "../styles/ClientProposalCard.module.css";
import { IoStarSharp } from "react-icons/io5";
import profile from "../../../assets/images/profile.png";
import { formatDate } from "../../../utils/helpers";
function ClientProposalCard({ proposal }) {
  const freelancer = proposal.freelancer;

  const statusClass = {
    pending: styles.pending,
    accepted: styles.accepted,
    rejected: styles.rejected,
  };
  return (
    <div className={styles.proposalCard}>
      <div className={styles.proposalCardHeader}>
        <div className={styles.proposalCardHeaderLeft}>
          <img
            src={profile}
            className={styles.avatar}
            alt="freelancer avatar"
          />
          <div className={styles.freelancerInfo}>
            <h3 className={styles.freelancerFullName}>
              {freelancer.user.first_name} {freelancer.user.last_name}
            </h3>
            <p className={styles.freelancerTitle}>{freelancer.title} </p>
          </div>
        </div>
        <div className={styles.freelancerHeaderRight}>
          <p className={styles.send_at}>{formatDate(proposal.created_at)}</p>
        </div>
      </div>

      <div className={styles.proposalCardContent}>
        <p className={styles.proposalCoverLetter}>"{proposal.cover_letter}"</p>
        <div className={styles.proposalSubCardsContainer}>
          <div className={`${styles.proposalBid} ${styles.proposalSubCard}`}>
            <span>Bid</span> <span>${proposal.price}</span>
          </div>
          <div
            className={`${styles.proposalDelivery} ${styles.proposalSubCard}`}
          >
            <span>Delivery </span>
            <span>{proposal.delivery_time}</span>
          </div>
          <div
            className={`${styles.proposalStatus} ${styles.proposalSubCard} `}
          >
            <span>Status</span>
            <span
              className={`${styles.status} ${statusClass[proposal.status]}`}
            >
              {proposal.status}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.proposalActions}>
        <div className={styles.primaryActions}>
          {proposal.status === "pending" && (
            <>
              <button className={`${styles.actionBtn} ${styles.accept}`}>
                accept
              </button>
              <button className={`${styles.actionBtn} ${styles.reject}`}>
                reject
              </button>
            </>
          )}
        </div>
        <div className={styles.secondaryActions}>
          <NavLink className={`${styles.link} ${styles.detail}`}>
            view detail
          </NavLink>
          {proposal.status === "accepted" && (
            <NavLink className={`${styles.link} ${styles.message}`}>
              message
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientProposalCard;
