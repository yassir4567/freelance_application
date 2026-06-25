import SimpleCard from "../../../shared/ui/SimpleCard";
import Welcome from "../../../shared/common/Welcome";
import FreelancerActiveContracts from "../components/FreelancerActiveContracts";
import styles from "../styles/FreelancerDashboardPage.module.css";
import { AiOutlineProject, AiOutlineDeliveredProcedure } from "react-icons/ai";
import { VscGitPullRequestDone } from "react-icons/vsc";
import profile from "../../../assets/images/profile.png";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import CompleteProfileAlert from "../../../shared/common/CompleteProfileAlert";
import { useTranslation } from "react-i18next";
import { dashboardApi } from "../../../api/dashboard/dashboardApi";

function FreelancerDashboardPage() {
  const [data, setData] = useState([]);
  const { user, isLoading, profileCompletionState } = useAuth();
  const { t } = useTranslation();
  useEffect(() => {
    const loadStats = async () => {
      const result = await dashboardApi.getDashboardData("freelancer");
      setData(result.data);
    };
    loadStats();
  }, []);

  const overview_cards = [
    {
      id: 0,
      title: t(`dashboard.${user.role}.cards.activeProjects.title`),
      description: t(`dashboard.${user.role}.cards.activeProjects.subTitle`),
      total: data?.stats?.active_projects || 0,
      icon: <AiOutlineProject />,
    },
    {
      id: 1,
      title: t(`dashboard.${user.role}.cards.acceptedProposals.title`),
      description: t(`dashboard.${user.role}.cards.acceptedProposals.subTitle`),
      total: data?.stats?.accepted_proposals || 0,
      icon: <VscGitPullRequestDone />,
    },
    {
      id: 3,
      title: t(`dashboard.${user.role}.cards.completedContracts.title`),
      description: t(
        `dashboard.${user.role}.cards.completedContracts.subTitle`,
      ),
      total: data?.stats?.completed_contracts || 0,
      icon: <AiOutlineDeliveredProcedure />,
    },
  ];

  const welcome = `${t("common.labels.welcome")} ${user.first_name} ${user.last_name}`;

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <Welcome
          welcome={welcome}
          min_description={t(`dashboard.${user.role}.welcomeSubTitle`)}
        />
        {!profileCompletionState.is_profile_completed && (
          <CompleteProfileAlert role="freelancer" />
        )}
      </div>

      <div className={styles.overview}>
        {overview_cards.map((card) => (
          <SimpleCard
            key={card.id}
            title={card.title}
            value={card.total}
            description={card.description}
            icon={card.icon}
            className={styles.overview_card}
          />
        ))}
      </div>

      <div className={styles.main}>
        <div className={styles.activeContracts}>
          <h3 className={styles.title}>
            {t("dashboard.freelancer.table.title")}
          </h3>
          <FreelancerActiveContracts contracts={data?.active_contracts} />
          <div className={styles.allContractsLink}>
            <NavLink className={styles.link}>
              {t("dashboard.freelancer.table.action")}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreelancerDashboardPage;
