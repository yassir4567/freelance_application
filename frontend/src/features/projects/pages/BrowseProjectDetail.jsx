import { NavLink, useParams } from "react-router-dom";
import styles from "../styles/BrowseProjectDetail.module.css";
import { MdOutlineDateRange } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { IoPricetagsOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { SiLevelsdotfyi } from "react-icons/si";
import { SlSizeFullscreen } from "react-icons/sl";
import { useEffect, useState } from "react";
import { getBrowseProjectDetail } from "../../../api/projects/getBrowseProjectDetail";
import { formatDate } from "../../../utils/helpers";

function BrowseProjectDetail() {
  const { projectId } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const loadProject = async () => {
      const response = await getBrowseProjectDetail(projectId);
      setData(response.data);
    };
    loadProject();
  }, []);

  const client = data?.project?.client;

  return (
    <div className={styles.projectDetailPage}>
      <div className={styles.leftSide}>
        <div className={styles.header}>
          <h1 className={`pageTitle ${styles.projectTitle}`}>
            {data.project?.title}
          </h1>
          <div className={styles.minHeader}>
            <div className={styles.postedDate}>
              <MdOutlineDateRange className={styles.icon} />
              <span>{formatDate(data.project?.created_at)}</span>
            </div>
            <div className={styles.country}>
              <CiLocationOn className={styles.icon} />
              <span>{client?.country}</span>
            </div>
          </div>
        </div>
        <div className={styles.devider}></div>

        <div className={styles.summary}>
          <h5 className={styles.sectionTitle}>Description</h5>
          <p className={styles.description}>{data.project?.description}</p>

          <div className={styles.devider}></div>

          <div className={styles.projectInfos}>
            <div className={styles.info}>
              <h5 className={styles.infoTitle}>
                <IoPricetagsOutline className={styles.icon} />
                <span>Price</span>
              </h5>
              <p className={styles.infoP}>{data.project?.budget}$</p>
            </div>

            <div className={styles.info}>
              <h5 className={styles.infoTitle}>
                <IoMdTime className={styles.icon} />
                <span>Duration</span>
              </h5>
              <p className={styles.infoP}>
                {data.project?.duration.split("_").join(" ")}
              </p>
            </div>

            <div className={styles.info}>
              <h5 className={styles.infoTitle}>
                <SiLevelsdotfyi className={styles.icon} />
                <span>Experience</span>
              </h5>
              <p className={styles.infoP}>{data.project?.experience_level}</p>
            </div>

            <div className={styles.info}>
              <h5 className={styles.infoTitle}>
                <SlSizeFullscreen className={styles.icon} />
                <span>Project size</span>
              </h5>
              <p className={styles.infoP}>{data.project?.size}</p>
            </div>
          </div>

          <div className={styles.devider}></div>

          <div>
            <h5 className={styles.sectionTitle}>Required skills</h5>
            <div className={styles.skills}>
              {data.project?.skills.map((skill) => (
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
          <NavLink className={styles.actionLink}>Send proposal</NavLink>
        </div>

        <div className={styles.clientInfos}>
          <h4 className={styles.clientInfosTitle}>About the client</h4>
          <div className={styles.infos}>
            <p>
              Full name : {client?.first_name} {client?.last_name}
            </p>
            <p>{data.client_projects_count} posted projects</p>
            <p>Member since {formatDate(client?.created_at)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrowseProjectDetail;
