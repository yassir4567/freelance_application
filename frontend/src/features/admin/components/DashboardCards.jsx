import { FiFolder, FiGrid, FiUsers } from "react-icons/fi";
import { GiSkills } from "react-icons/gi";
import { MdOutlineCategory } from "react-icons/md";
import styles from "../styles/DashboardCards.module.css";
import { useTranslation } from "react-i18next";

function DashboardCards({ dashboardData }) {
  const { t } = useTranslation();
  const stats = dashboardData?.stats || {};
  const projectStatuses = dashboardData?.project_statuses || {};

  const dashboardCards = [
    {
      id: 1,
      title: t("ui.labels.totalUsers"),
      value: stats.total_users || 0,
      description: t("ui.labels.clientsAndFreelancers", {
        clients: stats.total_clients || 0,
        freelancers: stats.total_freelancers || 0,
      }),
      icon: <FiUsers />,
      tone: "blue",
    },
    {
      id: 2,
      title: t("ui.labels.totalProjects"),
      value: stats.total_projects || 0,
      description: t("ui.labels.inProgressCount", {
        count: stats.projects_in_progress || 0,
      }),
      icon: <FiFolder />,
      tone: "green",
    },
    {
      id: 3,
      title: t("admin.categories.title"),
      value: stats.total_categories || 0,
      description: t("ui.labels.projectGroupsAvailable"),
      icon: <MdOutlineCategory />,
      tone: "purple",
    },
    {
      id: 4,
      title: t("admin.skills.title"),
      value: stats.total_skills || 0,
      description: t("ui.labels.skillsLinkedToCategories"),
      icon: <GiSkills />,
      tone: "orange",
    },
    {
      id: 5,
      title: t("ui.labels.escrowAmount"),
      value: formatMoney(stats.escrow_amount),
      description: t("ui.labels.currentlyHeldPayments"),
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
            <p>{t("ui.labels.projectStatus")}</p>
            <h2>{t("ui.labels.projectsByWorkflow")}</h2>
          </div>
          <span>{t("ui.labels.totalCount", { count: stats.total_projects || 0 })}</span>
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

export default DashboardCards;
