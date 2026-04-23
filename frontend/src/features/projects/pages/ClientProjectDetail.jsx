import { useOutletContext, useParams } from "react-router-dom";
import styles from "../styles/ClientProjectDetail.module.css";
import AssignedFreelancerCard from "../components/AssignedFreelancerCard";
import { useEffect, useState } from "react";
import { getClientProjectDetail } from "../../../api/projects/getClientProjectDetail";
import { formatDate } from "../../../utils/helpers";

function ClientProjectDetail() {
  const { projectId } = useParams();
  const { project } = useOutletContext();

  const showAssignedFreelancer =
    project?.status?.toLowerCase() === "completed" ||
    project?.status?.toLowerCase() === "in_progress";

  return (
    <div className={styles.detailProjectPage}>
      <div className={styles.projectDetail}>
        <div className={styles.projectDetailItem}>
          <h4 className={styles.projectDetailItemTitle}>Description</h4>
          <p className={styles.projectDetailItemSubText}>
            {project?.description}
          </p>
        </div>
        <div className={styles.projectDetailItem}>
          <h4 className={styles.projectDetailItemTitle}>Status</h4>
          <p className={styles.projectDetailItemSubText}>
            {project?.status.split("_").join(" ")}
          </p>
        </div>

        <div className={styles.projectDetailItem}>
          <h4 className={styles.projectDetailItemTitle}>Budget</h4>
          <p className={styles.projectDetailItemSubText}>{project?.budget}$</p>
        </div>

        <div className={styles.projectDetailItem}>
          <h4 className={styles.projectDetailItemTitle}>Published in </h4>
          <p className={styles.projectDetailItemSubText}>
            {formatDate(project?.created_at)}
          </p>
        </div>

        <div className={styles.projectDetailItem}>
          <h4 className={styles.projectDetailItemTitle}>
            Required experience level
          </h4>
          <p className={styles.projectDetailItemSubText}>
            {project?.experience_level}
          </p>
        </div>

        <div className={styles.projectDetailItem}>
          <h4 className={styles.projectDetailItemTitle}>Project size</h4>
          <p className={styles.projectDetailItemSubText}>{project?.size}</p>
        </div>

        <div className={styles.projectDetailItem}>
          <h4 className={styles.projectDetailItemTitle}>Estimated Duration</h4>
          <p className={styles.projectDetailItemSubText}>
            {project?.duration?.split("_").join(" ")}
          </p>
        </div>

        <div className={styles.projectDetailItem}>
          <h4 className={styles.projectDetailItemTitle}>Number of proposals</h4>
          <p className={styles.projectDetailItemSubText}>
            {project?.proposals_count}
          </p>
        </div>
      </div>

      {showAssignedFreelancer && (
        <div className={styles.hiredFreelancer}>
          <h2>Assigned Freelancer</h2>
          <AssignedFreelancerCard freelancer={project?.freelancer} />
        </div>
      )}
    </div>
  );
}

export default ClientProjectDetail;
