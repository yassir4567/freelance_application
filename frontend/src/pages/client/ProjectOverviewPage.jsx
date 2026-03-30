import { useParams } from "react-router-dom";
import styles from "./ProjectOverviewPage.module.css";
import { projects } from "../../api/projects";
import AssignedFreelancerCard from "../../components/cards/AssignedFreelancerCard";

function ProjectOverviewPage() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === +projectId);

  if (!project) {
    return <h1>Not Found</h1>;
  }

  const showAssignedFreelancer =
    project.status.toLowerCase() === "completed" ||
    project.status.toLowerCase() === "in progress";

  return (
    <div className={styles.detailProjectPage}>
      <div className={styles.projectDetail}>
        <div className={styles.projectDetailItem}>
          <h4 className={styles.projectDetailItemTitle}>Description</h4>
          <p className={styles.projectDetailItemSubText}>
            {project.description}
          </p>
        </div>
        <div className={styles.projectDetailItem}>
          <h4 className={styles.projectDetailItemTitle}>Status</h4>
          <p className={styles.projectDetailItemSubText}>{project.status}</p>
        </div>

        <div className={styles.projectDetailItem}>
          <h4 className={styles.projectDetailItemTitle}>Budget</h4>
          <p className={styles.projectDetailItemSubText}>{project.budget}$</p>
        </div>

        <div className={styles.projectDetailItem}>
          <h4 className={styles.projectDetailItemTitle}>Published in </h4>
          <p className={styles.projectDetailItemSubText}>{project.createdAt}</p>
        </div>

        <div className={styles.projectDetailItem}>
          <h4 className={styles.projectDetailItemTitle}>
            Required experience level
          </h4>
          <p className={styles.projectDetailItemSubText}>
            {project.experienceLevel}
          </p>
        </div>

        <div className={styles.projectDetailItem}>
          <h4 className={styles.projectDetailItemTitle}>Project size</h4>
          <p className={styles.projectDetailItemSubText}>
            {project.projectSize}
          </p>
        </div>

        <div className={styles.projectDetailItem}>
          <h4 className={styles.projectDetailItemTitle}>Estimated Duration</h4>
          <p className={styles.projectDetailItemSubText}>
            {project.estimatedDuration.split("_").join(" ")}
          </p>
        </div>

        <div className={styles.projectDetailItem}>
          <h4 className={styles.projectDetailItemTitle}>Number of proposals</h4>
          <p className={styles.projectDetailItemSubText}>
            {project.proposalsCount}
          </p>
        </div>
      </div>

      {showAssignedFreelancer && (
        <div className={styles.hiredFreelancer}>
          <h2>Assigned Freelancer</h2>
           <AssignedFreelancerCard />
        </div>
      )}
    </div>
  );
}

export default ProjectOverviewPage;
