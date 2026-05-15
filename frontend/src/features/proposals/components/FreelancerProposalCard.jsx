import { useTranslation } from "react-i18next";
import { formatDate, getRelativeTime } from "../../../utils/helpers";
import styles from "../styles/FreelancerProposalCard.module.css";
import { NavLink } from "react-router-dom";

function FreelancerProposalCard({ proposal }) {
  const { t } = useTranslation();

  const proposalStatus = {
    pending: "status-accent",
    accepted: "status-success",
    rejected: "status-danger",
  };
  console.log(proposal);

  return (
    <div className={styles.proposalCard}>
      <div className={styles.cardHeader}>
        <div className={styles.headerTop}>
          <p className={styles.categoryName}>
            {proposal.project.category.name}
          </p>
          <p
            className={`${styles.proposalStatus} ${proposalStatus[proposal.status]}`}
          >
            {proposal.status}
          </p>
        </div>

        <div className={styles.header}>
          <h3 className={styles.title}>{proposal.project.title}</h3>
          <p className={styles.client}>
            Client : {proposal.project.client.first_name}{" "}
            {proposal.project.client.last_name}
          </p>
        </div>

        <div className={styles.coverLetterBox}>
          <p className={styles.coverLetter}>{proposal.cover_letter}</p>
        </div>

        <div className={styles.infosBox}>
          <div className={styles.infosBoxWrapper}>
            <div className={styles.infoItem}>
              <p className={styles.label}>
                {t("freelancerProposals.card.price")}
              </p>
              <p className={styles.value}>${proposal.price}</p>
            </div>

            <div className={styles.infoItem}>
              <p className={styles.label}>
                {t("freelancerProposals.card.delivery")}
              </p>
              <p className={styles.value}>{proposal.delivery_time}</p>
            </div>

            <div className={styles.infoItem}>
              <p className={styles.label}>
                {t("freelancerProposals.card.sent")}
              </p>
              <p className={styles.value}>
                {getRelativeTime(proposal.created_at)}
              </p>
            </div>
          </div>
        </div>

        {proposal.status === "accepted" && (
          <div className={styles.action}>
            <NavLink
              to={`/dashboard/freelancer/messages?chat=${proposal.contract.conversation.id}`}
              className={styles.link}
            >
              Message client
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default FreelancerProposalCard;
