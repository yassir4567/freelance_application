import { useState } from "react";
import PostProjectForm from "../components/PostProjectForm";
import styles from "../styles/PostProjectPage.module.css";

function PostProjectPage() {
  return (
    <div>
      <div className={styles.postJobSection}>
        <h1 className="pageTitle">Post job page</h1>
        <div className={styles.postJobFormSection}>
          <PostProjectForm />
        </div>
      </div>
    </div>
  );
}

export default PostProjectPage;
