import { useLocation } from "react-router-dom";
import ProjectsListSidebar from "../../components/cards/ProjectsListSidebar";
import styles from "./ProposalsPage.module.css";

function ProposalsPage() {

  const location = useLocation()

  const params = new URLSearchParams(location.search)

  

  // * Fake data for testing
  const projects = [
    {
      id: 0,
      title: "E-commerce website",
      status: "open",
      proposalsCount: 3,
    },
    {
      id: 1,
      title: "Portfolio website",
      status: "in review",
      proposalsCount: 4,
    },
    {
      id: 2,
      title: "Mobile app ui",
      status: "open",
      proposalsCount: 0,
    },
    {
      id: 3,
      title: "Task manager app",
      status: "completed",
      proposalsCount: 4,
    },
    {
      id: 4,
      title: "Task manager app",
      status: "completed",
      proposalsCount: 4,
    },
    {
      id: 5,
      title: "Task manager app",
      status: "completed",
      proposalsCount: 4,
    },
    {
      id: 6,
      title: "Task manager app",
      status: "completed",
      proposalsCount: 4,
    },
    {
      id: 7,
      title: "Task manager app",
      status: "completed",
      proposalsCount: 4,
    },
  ];

  const proposals = {
    0: [
      {
        id: 0,
        message: "proposal message 1",
        status: "PENDING",
        price: 200,
        delay: "2 week",
        date: "22/03/2026",
        freelancer: {
          id: 3,
          name: "ahmed",
          image_url: "img1.png",
          title: "web developer",
        },
      },
      {
        id: 2,
        message: "proposal message 2",
        status: "PENDING",
        price: 150,
        delay: "3 week",
        date: "21/03/2026",
        freelancer: {
          id: 2,
          name: "nasr",
          image_url: "img2.png",
          title: "full stack developer",
        },
      },
      {
        id: 3,
        message: "proposal message 3",
        status: "PENDING",
        price: 150,
        delay: "3 week",
        date: "21/03/2025",
        freelancer: {
          id: 1,
          name: "khaled",
          image_url: "img3.png",
          title: "full stack developer",
        },
      },
    ],
    1: [
      {
        id: 4,
        message: "proposal message 1",
        status: "PENDING",
        price: 200,
        delay: "2 week",
        date: "22/03/2026",
        freelancer: {
          id: 4,
          name: "nassim",
          image_url: "img4.png",
          title: "ui/ux & frontend",
        },
      },
      {
        id: 5,
        message: "proposal message 2",
        status: "SHORTLISTED",
        price: 150,
        delay: "1 week",
        date: "21/03/2026",
        freelancer: {
          id: 5,
          name: "ali",
          image_url: "img5.png",
          title: "machine learning developer",
        },
      },
      {
        id: 6,
        message: "proposal message 3",
        status: "SHORTLISTED",
        price: 150,
        delay: "15 day",
        date: "21/03/2025",
        freelancer: {
          id: 6,
          name: "nasr",
          image_url: "img6.png",
          title: "full stack developer",
        },
      },

      {
        id: 7,
        message: "proposal message 4",
        status: "REJECTED",
        price: 180,
        delay: "7 days",
        date: "21/03/2025",
        freelancer: {
          id: 7,
          name: "simo",
          image_url: "img7.png",
          title: "full stack developer",
        },
      },
    ],
    2: [],
    3: [
      {
        id: 8,
        message: "proposal message 1",
        status: "ACCEPTED",
        price: 199,
        delay: "3 week",
        date: "22/03/2026",
        freelancer: {
          id: 8,
          name: "brahim",
          image_url: "img8.png",
          title: "full stack developer",
        },
      },
      {
        id: 9,
        message: "proposal message 2",
        status: "REJECTED",
        price: 90,
        delay: "1 week",
        date: "21/03/2026",
        freelancer: {
          id: 9,
          name: "jack",
          image_url: "img9.png",
          title: "backend developer",
        },
      },
      {
        id: 10,
        message: "proposal message 3",
        status: "REJECTED",
        price: 150,
        delay: "15 day",
        date: "21/03/2025",
        freelancer: {
          id: 10,
          name: "nasr",
          image_url: "img10.png",
          title: "full stack developer",
        },
      },

      {
        id: 11,
        message: "proposal message 4",
        status: "REJECTED",
        price: 180,
        delay: "7 days",
        date: "21/03/2025",
        freelancer: {
          id: 11,
          name: "nassima",
          image_url: "img11.png",
          title: "front end developer",
        },
      },
    ],
  };
  return (
    <div className={styles.proposalsPage}>
      <h1 className="pageTitle">Proposals received</h1>
      <div className={styles.proposalsMain}>
        <aside className={styles.projectsTitlesSide}>
          <ProjectsListSidebar projects={projects} cur_project={params.get('project_id')} />
        </aside>
        <div className={styles.proposalsSection}>
          <h3 className={styles.proposalsTitle}>Proposals</h3>
          <div className={styles.proposalsCards}>
            {params.get('project_id')}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProposalsPage;
