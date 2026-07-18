import { useOutletContext } from "react-router-dom";
import styles from "../styles/ClientProjectDetail.module.css";
import AssignedFreelancerCard from "../components/AssignedFreelancerCard";
import { formatDate, formatSnakeCase } from "../../../utils/helpers";
import {
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiFileText,
  FiLayers,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import { useTranslation } from "react-i18next";
import type { Project } from "../../../types/project.types";
import type { AssignedFreelancerType } from "../hooks/useClientProject";

type ProjectOutletContext = {
  project: Project;
  freelancer: AssignedFreelancerType | null;
};

function ClientProjectDetail() {
  const { t } = useTranslation();
  const { project, freelancer } = useOutletContext<ProjectOutletContext>();
  const status = project.status.toLowerCase() || "open";
  const formattedStatus = formatSnakeCase(project.status);
  const duration =
    formatSnakeCase(project.duration) || t("ui.fallbacks.notSpecified");
  const publishedDate = project.created_at
    ? formatDate(project.created_at)
    : t("ui.fallbacks.notPublishedYet");

  const projectStats = [
    {
      label: t("common.labels.budget"),
      value:
        project.budget != null
          ? `$${project.budget}`
          : t("ui.fallbacks.notSet"),
      icon: <FiDollarSign />,
    },
    {
      label: t("common.labels.published"),
      value: publishedDate,
      icon: <FiCalendar />,
    },
    {
      label: t("common.labels.proposals"),
      value: project.proposals_count ?? 0,
      icon: <FiUsers />,
    },
  ];

  const projectDetails = [
    {
      label: t("common.labels.experienceLevel"),
      value: project.experience_level || t("ui.fallbacks.notSpecified"),
      icon: <FiTrendingUp />,
    },
    {
      label: t("common.labels.projectSize"),
      value: project.size || t("ui.fallbacks.notSpecified"),
      icon: <FiLayers />,
    },
    {
      label: t("common.labels.estimatedDuration"),
      value: duration,
      icon: <FiClock />,
    },
  ];

  return (
    <div className={styles.detailProjectPage}>
      <section className={styles.projectDetail}>
        <div className={styles.detailHeader}>
          <div>
            <p className={styles.eyebrow}>{t("common.labels.overview")}</p>
            <h2 className={styles.detailTitle}>
              {t("clientProjectDetail.title")}
            </h2>
          </div>
          <span className={`${styles.statusBadge} ${styles[status] || ""}`}>
            {formattedStatus}
          </span>
        </div>

        <div className={styles.statsGrid}>
          {projectStats.map((item) => (
            <div key={item.label} className={styles.statCard}>
              <span className={styles.statIcon}>{item.icon}</span>
              <div>
                <p className={styles.statLabel}>{item.label}</p>
                <p className={styles.statValue}>{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.descriptionPanel}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionIcon}>
              <FiFileText />
            </span>
            <h3>{t("common.labels.description")}</h3>
          </div>
          <p className={styles.descriptionText}>
            {project.description || t("ui.fallbacks.noDescription")}
          </p>
        </div>

        <div className={styles.detailsGrid}>
          {projectDetails.map((item) => (
            <div key={item.label} className={styles.projectDetailItem}>
              <span className={styles.detailIcon}>{item.icon}</span>
              <div>
                <h4 className={styles.projectDetailItemTitle}>{item.label}</h4>
                <p className={styles.projectDetailItemSubText}>{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {freelancer !== null && (
        <div className={styles.hiredFreelancer}>
          <div className={styles.assignedHeader}>
            <p className={styles.eyebrow}>{t("ui.labels.collaboration")}</p>
            <h2>{t("ui.labels.assignedFreelancer")}</h2>
          </div>
          <AssignedFreelancerCard freelancer={freelancer} />
        </div>
      )}
    </div>
  );
}

export default ClientProjectDetail;
