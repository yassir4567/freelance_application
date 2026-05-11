import { FiFolder, FiGrid, FiUsers } from "react-icons/fi";
import { GiSkills } from "react-icons/gi";
import { MdOutlineCategory } from "react-icons/md";
import styles from "../styles/DashboardCards.module.css";

function AdminCards({ dashboardData }) {
  const stats = dashboardData?.stats || {};
  const projectStatuses = dashboardData?.project_statuses || {};

  const dashboardCards = [
    {
      id: 1,
      title: "Total users",
      value: stats.total_users || 0,
      description: `${stats.total_clients || 0} clients, ${stats.total_freelancers || 0} freelancers`,
      icon: <FiUsers />,
      tone: "blue",
    },
    {
      id: 2,
      title: "Total projects",
      value: stats.total_projects || 0,
      description: `${stats.projects_in_progress || 0} in progress`,
      icon: <FiFolder />,
      tone: "green",
    },
    {
      id: 3,
      title: "Categories",
      value: stats.total_categories || 0,
      description: "Project groups available",
      icon: <MdOutlineCategory />,
      tone: "purple",
    },
    {
      id: 4,
      title: "Skills",
      value: stats.total_skills || 0,
      description: "Skills linked to categories",
      icon: <GiSkills />,
      tone: "orange",
    },
    {
      id: 5,
      title: "Escrow amount",
      value: formatMoney(stats.escrow_amount),
      description: "Currently held payments",
      icon: <FiGrid />,
      tone: "slate",
    },
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.cards}>
        {dashboardCards.map((card) => (
          <article
            key={card.id}
            className={`${styles.card} ${styles[card.tone]}`}
          >
            <div className={styles.cardTop}>
              <span>{card.icon}</span>
              <p>{card.title}</p>
            </div>
            <strong>{card.value}</strong>
            <small>{card.description}</small>
          </article>
        ))}
      </div>

      <section className={styles.statusPanel}>
        <div className={styles.panelHeader}>
          <div>
            <p>Project status</p>
            <h2>Projects by workflow</h2>
          </div>
          <span>{stats.total_projects || 0} total</span>
        </div>

        <div className={styles.statusGrid}>
          <StatusItem label="Open" value={projectStatuses.open || 0} />
          <StatusItem label="In review" value={projectStatuses.in_review || 0} />
          <StatusItem label="In progress" value={projectStatuses.in_progress || 0} />
          <StatusItem label="Completed" value={projectStatuses.completed || 0} />
        </div>
      </section>
    </div>
  );
}

function StatusItem({ label, value }) {
  return (
    <div className={styles.statusItem}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function formatMoney(amount) {
  const value = Number(amount || 0);

  return `$${value.toFixed(2)}`;
}

export default AdminCards;
