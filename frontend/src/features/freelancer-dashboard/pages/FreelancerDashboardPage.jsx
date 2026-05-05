import SimpleCard from "../../../shared/ui/SimpleCard";
import Welcome from "../../../shared/common/Welcome";
import FreelancerActiveContracts from "../components/FreelancerActiveContracts";
import styles from "../styles/FreelancerDashboardPage.module.css";
import { AiOutlineProject, AiOutlineDeliveredProcedure } from "react-icons/ai";
import { VscGitPullRequestDone } from "react-icons/vsc";
import profile from "../../../assets/images/profile.png";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDashboardData } from "../../../api/dashboard/getDashboardData";
import { useAuth } from "../../../context/AuthContext";
import CompleteProfileAlert from "../../../shared/common/CompleteProfileAlert";

function FreelancerDashboardPage() {
  const [data, setData] = useState([]);
  const { user, isLoading, profileCompletionState } = useAuth();

  useEffect(() => {
    const loadStats = async () => {
      const result = await getDashboardData("freelancer");
      setData(result.data);
    };
    loadStats();
  }, []);

  const overview_cards = [
    {
      id: 0,
      title: "Active Projects",
      description: "Track all your projects",
      total: data?.stats?.active_projects || 0,
      icon: <AiOutlineProject />,
    },
    {
      id: 1,
      title: "Accepted proposals",
      description: "Proposals that turned into negotiation",
      total: data?.stats?.accepted_proposals || 0,
      icon: <VscGitPullRequestDone />,
    },
    {
      id: 3,
      title: "Completed Contracts",
      description: "Projects you've successfully delivered",
      total: data?.stats?.completed_contracts || 0,
      icon: <AiOutlineDeliveredProcedure />,
    },
  ];


  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <Welcome
          username={`${user.first_name} ${user.last_name}`}
          min_description={"Discover projects that match your skills"}
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
          <h3 className={styles.title}>Active contracts</h3>
          <FreelancerActiveContracts contracts={data?.active_contracts} />
          <div className={styles.allContractsLink}>
            <NavLink className={styles.link}>View active contracts</NavLink>
          </div>
        </div>
        <div className={styles.quickAction}>
          <h3 className={styles.title}>Quick action</h3>
          <div className={styles.actions}>
            <NavLink to="find-project" className={styles.actionLink}>
              Browse Projects
            </NavLink>
            <NavLink to="my-proposals" className={styles.actionLink}>
              View my proposals{" "}
            </NavLink>
            <NavLink className={styles.actionLink}>Check Messages</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreelancerDashboardPage;
