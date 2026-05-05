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

function ClientDashboardPage() {
  const [data, setData] = useState([]);
  const { user, profileCompletionState } = useAuth();

  console.log(profileCompletionState);

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
      title: "Total Projects",
      description: "All projects posted",
      total: data.stats?.total_projects || 0,
      icon: <IoBagSharp />,
    },
    {
      id: 1,
      title: "Received Proposals",
      description: "Offers from freelancers",
      total: data.stats?.received_proposals || 0,
      icon: <RiFolderReceivedFill />,
    },
    {
      id: 2,
      title: "Freelancers Hired",
      description: "People you've worked with",
      total: data.stats?.freelancer_hired || 0,
      icon: <HiRectangleStack />,
    },
    {
      id: 3,
      title: "Ongoing Contracts",
      description: "Projects in progress",
      total: data.stats?.ongoing_contracts || 0,
      icon: <RiContractFill />,
    },
  ];

  return (
    <div className={styles.dashboard}>
      <div>
        <div className={styles.dashboardHeader}>
          <Welcome
            username={`${user.first_name} ${user.last_name}`}
            min_description="Here's what happening with your projects today"
          />
          <div className={styles.post_project}>
            <NavLink
              to="/dashboard/client/postjob"
              className={styles.post_job_btn}
            >
              <span>Post Job</span> <IoMdAdd />
            </NavLink>
          </div>
        </div>
        {!profileCompletionState.is_profile_completed && (
          <CompleteProfileAlert role="client" />
        )}
      </div>
      <div className={styles.overview}>
        <h3 className={styles.overviewTitle}>Overview</h3>
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
        <h1 className={styles.recentTitle}>Recent Projects</h1>
        <RecentProjectsTable projects={data?.recent_projects} />
      </div>
    </div>
  );
}

export default ClientDashboardPage;
