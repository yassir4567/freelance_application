import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./UserDetails.module.css";

export default function ViewDetailUser({ user }) {
  const data = user || {
    id: 1,
    fullName: "Mohamed Ali",
    email: "mohamed@gmail.com",
    phone: "+212600000000",
    role: "freelancer", // client or freelancer
    address: "Rabat, Morocco",

    // خاص غير بالـ freelancer
    experiences: [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Company",
    startDate: "2022",
    endDate: "2023",
    description: "Worked on React projects and UI design",
  },
  {
    id: 2,
    title: "Fullstack Developer",
    company: "Startup",
    startDate: "2023",
    endDate: "Present",
    description: "Built web apps using MERN stack",
  },
  {
      id: 2,
    title: "Fullstack Developer",
    company: "Startup",
    startDate: "2023",
    endDate: "Present",
    description: "Built web apps using MERN stack",
  },
],
skills: ["React", "Node.js", "MongoDB"],


    projects: [
      { id: 1, title: "Website Design", status: "active" },
      { id: 2, title: "E-commerce App", status: "completed" },
      { id: 3, title: "E-commerce App", status: "completed" },
      { id: 4, title: "E-commerce App", status: "completed" },
    ],
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>User Details</h2>

      {/* USER INFO */}
      <div className={styles.card}>
        <p><strong>ID:</strong> {data.id}</p>
        <p><strong>Full Name:</strong> {data.fullName}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Phone:</strong> {data.phone}</p>
        <p><strong>Role:</strong> {data.role}</p>
        <p><strong>Address:</strong> {data.address}</p>

       
      </div>
      {data.role === "freelancer" && (
  <>
    <h3 className={styles.sectionTitle}>Experience</h3>

    <div className={styles.grid}>
      {data.experiences.map((exp) => (
        <div key={exp.id} className={styles.expCard}>
          <h4>{exp.title}</h4>
          <p className={styles.company}>{exp.company}</p>

          <p className={styles.date}>
            {exp.startDate} - {exp.endDate}
          </p>

          <p className={styles.desc}>{exp.description}</p>
        </div>
      ))}
    </div>
  </>
)}

      {/* PROJECTS */}
      <h3 className={styles.sectionTitle}>
        {data.role === "client"
          ? "Client Projects"
          : "Freelancer Projects"}
      </h3>

      <div className={styles.grid}>
        {data.projects.map((p) => (
          <div key={p.id} className={styles.projectCard}>
            <h4>{p.title}</h4>
            <span className={styles.badge}>{p.status}</span>
          </div>
        ))}
      </div>

      <NavLink to="/dashboard/admin/users" className={styles.backBtn}>
        ⬅ Back
      </NavLink>
    </div>
  );
}