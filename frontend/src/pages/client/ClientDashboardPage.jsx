import { NavLink } from "react-router-dom";
import styles from "./ClientDashboardPage.module.css";
import { IoMdAdd } from "react-icons/io";
import { IoBagSharp } from "react-icons/io5";
import { RiFolderReceivedFill } from "react-icons/ri";
import { HiRectangleStack } from "react-icons/hi2";
import { RiContractFill } from "react-icons/ri";
import SimpleCard from "../../components/cards/SimpleCard";
import RecentProjectsTable from "../../components/tables/RecentProjectsTable";

function ClientDashboardPage() {
  const stats_cards = [
    {
      id: 0,
      title: "Total Projects",
      total: 9,
      icon: <IoBagSharp color="#c14343" />,
    },
    {
      id: 1,
      title: "Received Proposals",
      total: 9,
      icon: <RiFolderReceivedFill color="#c2c738" />,
    },
    {
      id: 2,
      title: "Freelancers Hired",
      total: 9,
      icon: <HiRectangleStack color="gray" />,
    },
    {
      id: 3,
      title: "Ongoing Contracts",
      total: 9,
      icon: <RiContractFill color="#118b50" />,
    },
  ];

  const recentProjects = [
    {
      id: 1,
      title: "Website Redesign",
      status: "Active",
      proposals: 12,
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Mobile App Development",
      status: "Under negotiation",
      proposals: 8,
      time: "1 day ago",
    },
    {
      id: 3,
      title: "Logo Design",
      status: "Completed",
      proposals: 15,
      time: "3 days ago",
    },
    {
      id: 4,
      title: "SEO Optimization",
      status: "Active",
      proposals: 6,
      time: "5 hours ago",
    },
    {
      id: 5,
      title: "Content Writing",
      status: "Cancel",
      proposals: 4,
      time: "1 week ago",
    },
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.welcomeSection}>
        <div className={styles.welcomeContent}>
          <h1 className="pageTitle">Welcome Username </h1>
          <h3 className={styles.welcomeSubTitle}>
            Here's what happening with your projects today
          </h3>
        </div>
        <div className={styles.post_project}>
          <NavLink
            to="/dashboard/client/postjob"
            className={styles.post_job_btn}
          >
            <span>Post Job</span> <IoMdAdd />
          </NavLink>
        </div>
      </div>
      <hr />
      <div className={styles.overview}>
        <h3 className={styles.overviewTitle}>Overview</h3>
        <div className={styles.statsCards}>
          {stats_cards.map((state) => (
            <SimpleCard key={state.id} icon={state.icon} title={state.title} value={state.total}>
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
