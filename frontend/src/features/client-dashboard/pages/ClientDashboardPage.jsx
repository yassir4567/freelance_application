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

function ClientDashboardPage() {
  const stats_cards = [
    {
      id: 0,
      title: "Total Projects",
      description: "All projects posted",
      total: 9,
      icon: <IoBagSharp />,
    },
    {
      id: 1,
      title: "Received Proposals",
      description: "Offers from freelancers",
      total: 9,
      icon: <RiFolderReceivedFill />,
    },
    {
      id: 2,
      title: "Freelancers Hired",
      description: "People you've worked with",
      total: 9,
      icon: <HiRectangleStack />,
    },
    {
      id: 3,
      title: "Ongoing Contracts",
      description: "Projects in progress",
      total: 9,
      icon: <RiContractFill />,
    },
  ];

  const recentProjects = [
    {
      id: 1,
      title: "Website Redesign",
      status: "open",
      proposals: 12,
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Mobile App Development",
      status: "in_review",
      proposals: 8,
      time: "1 day ago",
    },
    {
      id: 3,
      title: "Logo Design",
      status: "completed",
      proposals: 15,
      time: "3 days ago",
    },
    {
      id: 4,
      title: "SEO Optimization",
      status: "open",
      proposals: 6,
      time: "5 hours ago",
    },
    {
      id: 5,
      title: "Content Writing",
      status: "cancelled",
      proposals: 4,
      time: "1 week ago",
    },
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <Welcome
          username={"Ahmed"}
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
        <RecentProjectsTable projects={recentProjects} />
      </div>
    </div>
  );
}

export default ClientDashboardPage;
