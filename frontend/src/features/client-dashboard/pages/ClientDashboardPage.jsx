import { NavLink } from "react-router-dom";
import styles from "../styles/ClientDashboardPage.module.css";
import { IoMdAdd } from "react-icons/io";
import { IoBagSharp } from "react-icons/io5";
import { RiFolderReceivedFill } from "react-icons/ri";
import { HiRectangleStack } from "react-icons/hi2";
import { RiContractFill } from "react-icons/ri";
import SimpleCard from "../../../shared/ui/SimpleCard";
import RecentProjectsTable from "../components/RecentProjectsTable";
import Welcome from "../../../shared/common/Welcome";
import { useEffect, useState } from "react";
import { getDashboardData } from "../../../api/dashboard/getDashboardData";
import { useAuth } from "../../../context/AuthContext";
import CompleteProfileAlert from "../../../shared/common/CompleteProfileAlert";
import { useTranslation } from "react-i18next";

function ClientDashboardPage() {
  const {t} = useTranslation()
  const [data, setData] = useState([]);
  const { user, profileCompletionState } = useAuth();


  useEffect(() => {
    const loadStats = async () => {
      const result = await getDashboardData("client");
      setData(result.data);
    };
    loadStats();
  }, []);

  const stats_cards = [
    {
      id: 0,
      title: t(`dashboard.${user.role}.cards.projects.title`),
      description: t(`dashboard.${user.role}.cards.projects.subTitle`),
      total: data.stats?.total_projects || 0,
      icon: <IoBagSharp />,
    },
    {
      id: 1,
      title: t(`dashboard.${user.role}.cards.proposals.title`),
      description: t(`dashboard.${user.role}.cards.proposals.subTitle`),
      total: data.stats?.received_proposals || 0,
      icon: <RiFolderReceivedFill />,
    },
    {
      id: 2,
      title: t(`dashboard.${user.role}.cards.freelancerHired.title`),
      description: t(`dashboard.${user.role}.cards.freelancerHired.subTitle`),
      total: data.stats?.freelancer_hired || 0,
      icon: <HiRectangleStack />,
    },
    {
      id: 3,
      title: t(`dashboard.${user.role}.cards.activeContracts.title`),
      description: t(`dashboard.${user.role}.cards.activeContracts.subTitle`),
      total: data.stats?.ongoing_contracts || 0,
      icon: <RiContractFill />,
    },
  ];

  const welcome = `${t("common.labels.welcome")} ${user.first_name} ${user.last_name}`;

  return (
    <div className={styles.dashboard}>
      <div>
        <div className={styles.dashboardHeader}>
          <Welcome
            welcome={welcome}
            min_description={t(`dashboard.${user.role}.welcomeSubTitle`)}
          />
          <div className={styles.post_project}>
            <NavLink
              to="/dashboard/client/postjob"
              className={styles.post_job_btn}
            >
              <span>{t("common.nav.postProject")}</span> <IoMdAdd />
            </NavLink>
          </div>
        </div>
        {!profileCompletionState.is_profile_completed && (
          <CompleteProfileAlert role="client" />
        )}
      </div>
      <div className={styles.overview}>
        <h3 className={styles.overviewTitle}>{t("common.labels.overview")}</h3>
        <div className={styles.statsCards}>
          {stats_cards.map((state) => (
            <SimpleCard
              key={state.id}
              icon={state.icon}
              title={state.title}
              description={state.description}
              value={state.total}
            >
              {state.icon}
            </SimpleCard>
          ))}
        </div>
      </div>

      <div className={styles.recentProjects}>
        <h1 className={styles.recentTitle}>{t("dashboard.client.table.title")}</h1>
        <RecentProjectsTable projects={data?.recent_projects} />
      </div>
    </div>
  );
}

export default ClientDashboardPage;
