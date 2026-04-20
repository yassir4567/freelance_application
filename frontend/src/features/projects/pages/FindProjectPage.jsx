import FreelancerProjectCard from "../components/FreelancerProjectCard";
import FreelancerProjectsFilter from "../components/FreelancerProjectsFilter";
import FreelancerProjectsHeaderFilter from "../components/FreelancerProjectsHeaderFilter";
import Search from "../../../shared/ui/Search";
import styles from "../styles/FindProjectPage.module.css";

export const projects = [
  {
    id: 1,
    title: "e-commerce web site",
    description:
      "Build a modern and scalable e-commerce platform that allows users to browse products, add items to a cart, and complete secure online payments. The system should include user authentication, account management, and order tracking features. You will need to design both frontend and backend components, ensuring smooth communication between them. Performance optimization and clean UI/UX are essential to provide a seamless shopping experience. Integration with payment gateways such as Stripe is required. The platform should also support responsive design for mobile users. Code quality, maintainability, and scalability should be taken into consideration.",
    budget: 200,
    createdAt: "2026-03-20",
    status: "completed",
    proposalsCount: 3,
    experience: "mid-level",
    size: "medium",
    duration: "1 to 3 months",
    category: "Web Development",
    skills: ["React", "Laravel", "Stripe", "MySQL"],
  },
  {
    id: 2,
    title: "restaurant frontend",
    description:
      "Develop a responsive frontend for a restaurant website including menu display, reservation form, and smooth UI animations.",
    budget: 180,
    createdAt: "2026-03-21",
    status: "open",
    proposalsCount: 2,
    experience: "junior",
    size: "small",
    duration: "less than 1 month",
    category: "Frontend Development",
    skills: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    id: 3,
    title: "weather api",
    description:
      "Create a REST API that provides real-time weather data based on location, with caching and error handling for external API requests.",
    budget: 100,
    createdAt: "2026-03-17",
    status: "open",
    proposalsCount: 2,
    experience: "junior",
    size: "small",
    duration: "less than 1 month",

    category: "Backend Development",
    skills: ["Laravel", "REST API", "Caching", "JSON"],
  },
  {
    id: 4,
    title: "ui/ux design",
    description:
      "Design a clean and intuitive UI/UX for a mobile and web application, including wireframes, prototypes, and design system guidelines.",
    budget: 320,
    createdAt: "2026-03-23",
    status: "open",
    proposalsCount: 1,
    experience: "mid-level",
    size: "medium",
    duration: "1 to 3 months",
    category: "Design",
    skills: ["Figma", "Wireframing", "Prototyping", "Design System"],
  },
  {
    id: 5,
    title: "Barber website",
    description:
      "Improve an existing e-commerce website by optimizing performance, redesigning product pages, and enhancing user experience.",
    budget: 255,
    createdAt: "2026-03-22",
    status: "in_review",
    proposalsCount: 3,
    experience: "mid-level",
    size: "medium",
    duration: "1 to 3 months",

    category: "Web Development",
    skills: ["Performance Optimization", "React", "UX", "SEO"],
  },
  {
    id: 6,
    title: "freelance app",
    description:
      "Develop a freelance marketplace platform with client and freelancer roles, proposal system, messaging, and basic payment workflow.",
    budget: 255,
    createdAt: "2026-01-24",
    status: "cancelled",
    proposalsCount: 0,
    experience: "senior",
    size: "large",
    duration: "3 to 6 months",

    category: "Full Stack Development",
    skills: ["React", "Laravel", "Redux", "WebSockets"],
  },
  {
    id: 7,
    title: "portfolio",
    description:
      "Create a personal portfolio website showcasing projects, skills, and experience with a modern and responsive design.",
    budget: 40,
    createdAt: "2026-03-24",
    status: "in_review",
    proposalsCount: 1,
    experience: "junior",
    size: "small",
    duration: "less than 1 month",
    category: "Web Development",
    skills: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: 8,
    title: "social media app",
    description:
      "Build a scalable social media application with user profiles, posts, likes, comments, and real-time notifications.",
    budget: 1000,
    createdAt: "2026-03-25",
    status: "in_progress",
    proposalsCount: 3,
    experience: "senior",
    size: "large",
    duration: "more than 6 months",
    category: "Full Stack Development",
    skills: ["Node.js", "React", "Socket.io", "MongoDB"],
  },
];

function FindProjectPage() {
  return (
    <div className={styles.findProjectPage}>
      <h1 className="pageTitle">Browse all projects</h1>
      <div className={styles.searchBox}>
        <div className={styles.search}>
          <Search />
        </div>
        <button className={styles.clearAll}>Clear all</button>
      </div>

      <div className={styles.main}>
        <div className={styles.filters}>
          <FreelancerProjectsFilter />
        </div>
        <div className={styles.projectsSection}>
          <div className={styles.headerFilter}>
            <FreelancerProjectsHeaderFilter />
          </div>

          <div className={styles.projects}>
            {projects.map((project) => (
              <FreelancerProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindProjectPage;
