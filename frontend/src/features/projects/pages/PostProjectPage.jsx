import { useState } from "react";
import PostProjectForm from "../components/PostProjectForm";
import styles from "../styles/PostProjectPage.module.css";
import { useAuth } from "../../../context/AuthContext";
import CompleteProfileAlert from "../../../shared/common/CompleteProfileAlert";
import { useTranslation } from "react-i18next";

function PostProjectPage() {
  const { profileCompletionState } = useAuth();

  const { t } = useTranslation();

  return (
    <div>
      <div className={styles.postJobSection}>
        <h1 className="pageTitle">{t("postjob.title")}</h1>
        {!profileCompletionState.is_profile_completed && (
          <CompleteProfileAlert role="client" />
        )}
        <div className={styles.postJobFormSection}>
          <PostProjectForm
            is_profile_complete={profileCompletionState.is_profile_completed}
          />
        </div>
      </div>
    </div>
  );
}

export default PostProjectPage;
