import SimpleCard from "../../../shared/ui/SimpleCard";
import Welcome from "../../../shared/common/Welcome";
import FreelancerActiveContracts from "../components/FreelancerActiveContracts";
import CompleteProfileAlert from "../components/CompleteProfileAlert";
import styles from "../styles/FreelancerDashboardPage.module.css";
import { AiOutlineProject, AiOutlineDeliveredProcedure } from "react-icons/ai";
import { VscGitPullRequestDone } from "react-icons/vsc";
import profile from "../../../assets/images/profile.png";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {getStats} from "../../../api/dashboard/getStats";

function FreelancerDashboardPage() {
  const [stats , setStats] = useState([])

  useEffect(() => {
    const loadStats = async () => {
      const result = await getStats() ;
      setStats(result.stats)
    }
    loadStats()
  } , [])
  

  const overview_cards = [
    {
      id: 0,
      title: "Active Projects",
      description: "Track all your projects",
      total: stats?.active_projects || 0,
      icon: <AiOutlineProject />,
    },
    {
      id: 1,
      title: "Accepted proposals",
      description: "Proposals that turned into negotiation",
      total: stats?.accepted_proposals || 0,
      icon: <VscGitPullRequestDone />,
    },
    {
      id: 3,
      title: "Completed Contracts",
      description: "Projects you've successfully delivered",
      total: stats?.completed_contracts || 0,
      icon: <AiOutlineDeliveredProcedure />,
    },
  ];

  const active_contracts = [
    {
      id: 0,
      title: "E-commerce web site",
      budget: 299,
      deadline: "2026-05-20",
      client: {
        id: 0,
        fullName: "Ahmed ahmed",
        avatar: profile,
      },
    },
    {
      id: 1,
      title: "Resume generator",
      budget: 39,
      deadline: "2026-04-20",
      client: {
        id: 1,
        fullName: "Khaled khaled",
        avatar: profile,
      },
    },
    {
      id: 2,
      title: "Restaurant website",
      budget: 29,
      deadline: "2026-04-22",
      client: {
        id: 2,
        fullName: "Nasr Nasr",
        avatar: profile,
      },
    },
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <Welcome
          username={"Yassir"}
          min_description={"Discover projects that match your skills"}
        />
        <CompleteProfileAlert />
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
          <FreelancerActiveContracts contracts={active_contracts} />
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
            <NavLink className={styles.actionLink}>View my proposals </NavLink>
            <NavLink className={styles.actionLink}>Check Messages</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreelancerDashboardPage;
