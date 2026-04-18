import { NavLink, useParams } from "react-router-dom";
import styles from "./ProjectDetailPage.module.css";
import { MdOutlineDateRange } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { IoPricetagsOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { SiLevelsdotfyi } from "react-icons/si";
import { SlSizeFullscreen } from "react-icons/sl";

function ProjectDetailPage() {
  const { projectId } = useParams();

  return (
    <div className={styles.projectDetailPage}>
      <div className={styles.leftSide}>
        <div className={styles.header}>
          <h1 className={`pageTitle ${styles.projectTitle}`}>Project title</h1>
          <div className={styles.minHeader}>
            <div className={styles.postedDate}>
              <MdOutlineDateRange className={styles.icon} />
              <span>Mar 20 , 19</span>
            </div>
            <div className={styles.country}>
              <CiLocationOn className={styles.icon} />
              <span>Morocco</span>
            </div>
          </div>
        </div>
        <div className={styles.devider}></div>

        <div className={styles.summary}>
          <h5 className={styles.sectionTitle}>Description</h5>
          <p className={styles.description}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            exercitationem nemo totam impedit aut distinctio a excepturi, est
            doloribus ullam nam deserunt repellat, ad itaque sapiente labore.
            Repellat nulla, quae iste nisi cumque alias a provident ea eveniet
            aliquam. Corrupti repudiandae soluta unde, aperiam quasi velit. Qui
            nisi exercitationem esse molestias doloremque non magnam animi.
            Ducimus, necessitatibus! Iste repellat quas laborum perspiciatis
            ratione reiciendis mollitia nihil velit excepturi ipsum expedita
            quod autem sint necessitatibus, repudiandae accusantium quam,
            veritatis, eum nulla alias commodi quaerat illum aliquam explicabo!
            Accusamus ipsam ex dicta id, tenetur nisi ab minima quibusdam
            adipisci, dolores ullam maxime.
          </p>

          <div className={styles.devider}></div>

          <div className={styles.projectInfos}>
            <div className={styles.info}>
              <h5 className={styles.infoTitle}>
                <IoPricetagsOutline className={styles.icon} />
                <span>Price</span>
              </h5>
              <p className={styles.infoP}>20$</p>
            </div>

            <div className={styles.info}>
              <h5 className={styles.infoTitle}>
                <IoMdTime className={styles.icon} />
                <span>Duration</span>
              </h5>
              <p className={styles.infoP}>Less than 1 month</p>
            </div>

            <div className={styles.info}>
              <h5 className={styles.infoTitle}>
                <SiLevelsdotfyi className={styles.icon} />
                <span>Experience</span>
              </h5>
              <p className={styles.infoP}>Mid level</p>
            </div>

            <div className={styles.info}>
              <h5 className={styles.infoTitle}>
                <SlSizeFullscreen className={styles.icon} />
                <span>Project size</span>
              </h5>
              <p className={styles.infoP}>Medium</p>
            </div>
          </div>

          <div className={styles.devider}></div>

          <div>
            <h5 className={styles.sectionTitle}>Required skills</h5>
            <div className={styles.skills}>
              <div className={styles.skill}>React</div>
              <div className={styles.skill}>Laravel</div>
              <div className={styles.skill}>REST Api</div>
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
            <p>Full name : Del piero</p>
            <p>10 posted projects</p>
            <p>Member since Apr 19 2023</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailPage;
