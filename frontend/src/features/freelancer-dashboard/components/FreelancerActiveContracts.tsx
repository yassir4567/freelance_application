import { Link, NavLink } from "react-router-dom";
import styles from "../styles/FreelancerActiveContracts.module.css";
import { formatDate } from "../../../utils/helpers";
import avatar from "../../../assets/images/profile.png";
import { useTranslation } from "react-i18next";
import type { FreelancerDashboardActiveContracts } from "../../../types/dashboard.types";

type FreelancerActiveContractsProps = {
  contracts: FreelancerDashboardActiveContracts[];
};

function FreelancerActiveContracts({
  contracts,
}: FreelancerActiveContractsProps) {
  const { t } = useTranslation();
  const hasContracts = contracts.length > 0;
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.headerRow}>
          <th>{t("common.labels.project")}</th>
          <th>{t("common.labels.client")}</th>
          <th>{t("common.labels.budget")}</th>
          <th>{t("common.labels.deadline")}</th>
          <th>{t("common.labels.actions")}</th>
        </tr>
      </thead>
      <tbody>
        {hasContracts ? (
          contracts?.map((contract) => {
            const {
              id,
              final_price,
              final_deadline,
              title,
              client: { first_name, last_name },
            } = contract;

            return (
              <tr key={id} className={styles.row}>
                <td>{title}</td>
                <td>
                  <div className={styles.clientTD}>
                    <img src={avatar} width={37} alt="Avatar" />
                    <span>
                      {first_name} {last_name}
                    </span>
                  </div>
                </td>
                <td className={styles.budget}> ${final_price} </td>
                <td className={styles.deadline}>
                  {formatDate(final_deadline)}
                </td>
                <td>
                  <Link to={`contracts/${id}`} className={styles.link}>
                    View details
                  </Link>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={5} className={styles.empty}>
              You don't have active contracts yet
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default FreelancerActiveContracts;
