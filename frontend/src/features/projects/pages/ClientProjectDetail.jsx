import { useOutletContext } from "react-router-dom";
import styles from "../styles/ClientProjectDetail.module.css";
import AssignedFreelancerCard from "../components/AssignedFreelancerCard";
import { formatDate } from "../../../utils/helpers";
import {
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiFileText,
  FiLayers,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

function ClientProjectDetail() {
  const { project } = useOutletContext();
  const status = project?.status?.toLowerCase() || "open";
  const formattedStatus = status.split("_").join(" ");
  const duration = project?.duration?.split("_").join(" ") || "Not specified";
  const publishedDate = project?.created_at
    ? formatDate(project.created_at)
    : "Not published yet";

  const showAssignedFreelancer =
    project?.status?.toLowerCase() === "completed" ||
    project?.status?.toLowerCase() === "in_progress";

  const projectStats = [
    {
      label: "Budget",
      value: project?.budget != null ? `$${project.budget}` : "Not set",
      icon: <FiDollarSign />,
    },
    {
      label: "Published",
      value: publishedDate,
      icon: <FiCalendar />,
    },
    {
      label: "Proposals",
      value: project?.proposals_count ?? 0,
      icon: <FiUsers />,
    },
  ];

  const projectDetails = [
    {
      label: "Experience level",
      value: project?.experience_level || "Not specified",
      icon: <FiTrendingUp />,
    },
    {
      label: "Project size",
      value: project?.size || "Not specified",
      icon: <FiLayers />,
    },
    {
      label: "Estimated duration",
      value: duration,
      icon: <FiClock />,
    },
  ];

  return (
    <div className={styles.detailProjectPage}>
      <section className={styles.projectDetail}>
        <div className={styles.detailHeader}>
          <div>
            <p className={styles.eyebrow}>Project overview</p>
            <h2 className={styles.detailTitle}>Client project details</h2>
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
            <h3>Description</h3>
          </div>
          <p className={styles.descriptionText}>
            {project?.description || "No description available yet."}
          </p>
        </div>

        <div className={styles.detailsGrid}>
          {projectDetails.map((item) => (
            <div key={item.label} className={styles.projectDetailItem}>
              <span className={styles.detailIcon}>{item.icon}</span>
              <div>
                <h4 className={styles.projectDetailItemTitle}>
                  {item.label}
                </h4>
                <p className={styles.projectDetailItemSubText}>{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showAssignedFreelancer && (
        <div className={styles.hiredFreelancer}>
          <div className={styles.assignedHeader}>
            <p className={styles.eyebrow}>Collaboration</p>
            <h2>Assigned Freelancer</h2>
          </div>
          <AssignedFreelancerCard freelancer={project?.freelancer} />
        </div>
      )}
    </div>
  );
}

export default ClientProjectDetail;
