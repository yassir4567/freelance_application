import { NavLink, useParams } from "react-router-dom";
import styles from "../styles/BrowseProjectDetail.module.css";
import { MdOutlineDateRange } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { IoPricetagsOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { SiLevelsdotfyi } from "react-icons/si";
import { SlSizeFullscreen } from "react-icons/sl";
import { useEffect, useState } from "react";
import { formatDate } from "../../../utils/helpers";
import SendProposalModal from "../../proposals/components/SendProposalModal";
import { useTranslation } from "react-i18next";
import { projectApi } from "../../../api/projects/projectApi";

function BrowseProjectDetail() {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [showSendProposalModal, setShowSendProposalModal] = useState(false);

  useEffect(() => {
    const loadProject = async () => {
      const response = await projectApi.getBrowseProjectDetail(projectId);
      if (response.success) {
        setProject(response.data);
      }
    };
    loadProject();
  }, []);

  const client = project?.project?.client;

  const onClose = () => {
    setShowSendProposalModal(false);
  };
  
  // ! just for now
  if(!project) {
    return <p>Project not found</p>
  }

  return (
    <div className={styles.projectDetailPage}>
      <div className={styles.leftSide}>
        <div className={styles.header}>
          <h1 className={`pageTitle ${styles.projectTitle}`}>
            {project?.project?.title}
          </h1>
          <div className={styles.minHeader}>
            <div className={styles.postedDate}>
              <MdOutlineDateRange className={styles.icon} />
              <span>{formatDate(project?.project?.created_at)}</span>
            </div>
            <div className={styles.country}>
              <CiLocationOn className={styles.icon} />
              <span>{client?.country}</span>
            </div>
          </div>
        </div>
        <div className={styles.devider}></div>

        <div className={styles.summary}>
          <h5 className={styles.sectionTitle}>
            {t("common.labels.description")}
          </h5>
          <p className={styles.description}>{project?.project?.description}</p>

          <div className={styles.devider}></div>

          <div className={styles.projectInfos}>
            <div className={styles.info}>
              <h5 className={styles.infoTitle}>
                <IoPricetagsOutline className={styles.icon} />
                <span>{t("common.labels.price")}</span>
              </h5>
              <p className={styles.infoP}>{project?.project?.budget}$</p>
            </div>

            <div className={styles.info}>
              <h5 className={styles.infoTitle}>
                <IoMdTime className={styles.icon} />
                <span>{t("common.labels.duration")}</span>
              </h5>
              <p className={styles.infoP}>
                {project?.project?.duration.split("_").join(" ")}
              </p>
            </div>

            <div className={styles.info}>
              <h5 className={styles.infoTitle}>
                <SiLevelsdotfyi className={styles.icon} />
                <span>{t("common.labels.experience")}</span>
              </h5>
              <p className={styles.infoP}>
                {project?.project?.experience_level}
              </p>
            </div>

            <div className={styles.info}>
              <h5 className={styles.infoTitle}>
                <SlSizeFullscreen className={styles.icon} />
                <span>{t("common.labels.projectSize")}</span>
              </h5>
              <p className={styles.infoP}>{project?.project?.size}</p>
            </div>
          </div>

          <div className={styles.devider}></div>

          <div>
            <h5 className={styles.sectionTitle}>
              {t("browseProjectDetail.requiredSkills")}
            </h5>
            <div className={styles.skills}>
              {project?.project?.skills.map((skill) => (
                <div key={skill.id} className={styles.skill}>
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.actions}>
          {project?.isProposalSent ? (
            <div className={styles.proposalAlreadySent}>
              <p>{t("browseProjectDetail.alreadySent")} </p>
              <NavLink
                className={styles.viewProposalsLink}
                to="/dashboard/freelancer/my-proposals"
              >
                {t("common.actions.viewProposals")}
              </NavLink>
            </div>
          ) : (
            <NavLink
              className={styles.actionLink}
              onClick={() => setShowSendProposalModal(true)}
            >
              {t("common.actions.sendProposal")}
            </NavLink>
          )}
        </div>

        <div className={styles.clientInfos}>
          <h4 className={styles.clientInfosTitle}>
            {t("browseProjectDetail.aboutClient")}
          </h4>
          <div className={styles.infos}>
            <p>
              {t("common.labels.fullName")} : {client?.first_name}{" "}
              {client?.last_name}
            </p>
            <p>
              {project?.client_projects_count}{" "}
              {t("browseProjectDetail.postedProjects")}
            </p>
            <p>
              {t("common.labels.memberSince")} {formatDate(client?.created_at)}
            </p>
          </div>
        </div>
      </div>
      {showSendProposalModal && (
        <SendProposalModal
          isOpen={showSendProposalModal}
          onClose={onClose}
          projectId={projectId}
        />
      )}
    </div>
  );
}

export default BrowseProjectDetail;
