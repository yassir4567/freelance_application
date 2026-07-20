import { NavLink } from "react-router-dom";
import styles from "../styles/ClientProposalCard.module.css";
import profile from "../../../assets/images/profile.png";
import { formatDate } from "../../../utils/helpers";
import { useTranslation } from "react-i18next";
import type { ClientProjectProposalType } from "../../../types/proposal.types";

type ClientProposalCardProps = {
  proposal: ClientProjectProposalType;
  isAccepting: boolean;
  isRejecting: boolean;
  acceptFreelancerProposal: (proposalId: number) => void;
  rejectFreelancerProposal: (proposalId: number) => void;
};

function ClientProposalCard({
  proposal,
  isAccepting,
  isRejecting,
  acceptFreelancerProposal,
  rejectFreelancerProposal,
}: ClientProposalCardProps) {
  const { t } = useTranslation();
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
              {freelancer.first_name} {freelancer.last_name}
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
            <span>{t("common.labels.bid")}</span> <span>${proposal.price}</span>
          </div>
          <div
            className={`${styles.proposalDelivery} ${styles.proposalSubCard}`}
          >
            <span>{t("common.labels.delivery")} </span>
            <span>{proposal.delivery_time}</span>
          </div>
          <div
            className={`${styles.proposalStatus} ${styles.proposalSubCard} `}
          >
            <span>{t("common.labels.status")}</span>
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
              <button
                className={`${styles.actionBtn} ${styles.accept}`}
                onClick={() => acceptFreelancerProposal(proposal.id)}
                disabled={isAccepting || isRejecting}
              >
                {isAccepting ? "Accepting" : t("common.actions.accept")}
              </button>
              <button
                className={`${styles.actionBtn} ${styles.reject}`}
                onClick={() => rejectFreelancerProposal(proposal.id)}
                disabled={isAccepting || isRejecting}
              >
                {isRejecting ? "Rejecting" : t("common.actions.reject")}
              </button>
            </>
          )}
        </div>
        <div className={styles.secondaryActions}>
          {proposal.status === "accepted" && proposal.conversation && (
            <NavLink
              to={`/dashboard/client/messages?chat=${proposal.conversation.id}`}
              className={`${styles.link} ${styles.message}`}
            >
              {t("ui.actions.messageFreelancer")}
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientProposalCard;
