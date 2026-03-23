import { NavLink } from "react-router-dom";
import styles from "./ProjectsListSidebar.module.css";
import { isAction } from "@reduxjs/toolkit";

function ProjectsListSidebar({ projects, cur_project }) {
  const classes = {
    open: styles.open,
    "in review": styles.in_review,
    "in progress": styles.in_progress,
    completed: styles.completed,
    cancelled: styles.cancelled,
  };

  return <div>hello</div>
}

export default ProjectsListSidebar;
