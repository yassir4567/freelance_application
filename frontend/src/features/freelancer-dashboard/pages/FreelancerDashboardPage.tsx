import SimpleCard from "../../../shared/ui/SimpleCard";
import Welcome from "../../../shared/common/Welcome";
import FreelancerActiveContracts from "../components/FreelancerActiveContracts";
import styles from "../styles/FreelancerDashboardPage.module.css";
import { AiOutlineProject, AiOutlineDeliveredProcedure } from "react-icons/ai";
import { VscGitPullRequestDone } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import CompleteProfileAlert from "../../../shared/common/CompleteProfileAlert";
import { useTranslation } from "react-i18next";
import { dashboardApi } from "../../../api/dashboard/dashboardApi";
import type { FreelancerDashboard } from "../../../types/dashboard.types";

function FreelancerDashboardPage() {
  const [data, setData] = useState<FreelancerDashboard | null>(null);
  const { user, profileCompletionState } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { t } = useTranslation();
  useEffect(() => {
    const loadStats = async () => {
      setIsLoading(true);
      const result =
        await dashboardApi.getDashboardData<FreelancerDashboard>("freelancer");

      setIsLoading(false);
      if (!result.success) {
        setError(result.message || "Error in fetching dashboard data");
        return;
      }

      setData(result.data);
    };
    loadStats();
  }, []);

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (error !== "") {
    return <p>{error}</p>;
  }

  if (!user || !data || !profileCompletionState) {
    return null;
  }

  const overview_cards = [
    {
      id: 0,
      title: t(`dashboard.${user.role}.cards.activeProjects.title`),
      description: t(`dashboard.${user.role}.cards.activeProjects.subTitle`),
      total: data.stats.active_projects || 0,
      icon: <AiOutlineProject />,
    },
    {
      id: 1,
      title: t(`dashboard.${user.role}.cards.acceptedProposals.title`),
      description: t(`dashboard.${user.role}.cards.acceptedProposals.subTitle`),
      total: data.stats.accepted_proposals || 0,
      icon: <VscGitPullRequestDone />,
    },
    {
      id: 3,
      title: t(`dashboard.${user.role}.cards.completedContracts.title`),
      description: t(
        `dashboard.${user.role}.cards.completedContracts.subTitle`,
      ),
      total: data.stats.completed_contracts || 0,
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
            className={styles.overview_card ?? ""}
          />
        ))}
      </div>

      <div className={styles.main}>
        <div className={styles.activeContracts}>
          <h3 className={styles.title}>
            {t("dashboard.freelancer.table.title")}
          </h3>
          <FreelancerActiveContracts contracts={data.active_contracts} />
          <div className={styles.allContractsLink}>
            <Link to="/dashboard/freelancer/contracts" className={styles.link}>
              {t("dashboard.freelancer.table.action")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreelancerDashboardPage;
