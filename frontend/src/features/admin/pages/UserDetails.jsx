import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getUserDetails } from "../../../api/admin/getUserDetails";
import styles from "../styles/UserDetails.module.css";
import { useTranslation } from "react-i18next";

function UserDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      setError("");

      const result = await getUserDetails(id);

      if (result.success) {
        setUser(result.data);
      } else {
        setUser(null);
        setError(result.message);
      }

      setLoading(false);
    };

    loadUser();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.container}>
        <p className={styles.state}>{t("ui.states.loadingUserDetails")}</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>{error || t("admin.users.userNotFound")}</p>
        <NavLink to="/dashboard/admin/users" className={styles.backBtn}>
          {t("ui.actions.backToUsers")}
        </NavLink>
      </div>
    );
  }

  const location = [user.city, user.country].filter(Boolean).join(", ");
  const isFreelancer = user.role === "freelancer";
  const freelancer = user.freelancer;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <NavLink to="/dashboard/admin/users" className={styles.backBtn}>
          {t("ui.actions.back")}
        </NavLink>
        <span className={styles.role}>{user.role}</span>
      </div>

      <section className={styles.profile}>
        <div className={styles.avatar}>{user.name.charAt(0).toUpperCase()}</div>
        <div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
      </section>

      <section className={styles.grid}>
        <div className={styles.card}>
          <h2>{t("ui.labels.contactInformation")}</h2>
          <Info label={t("ui.labels.phone")} value={user.phone} fallback={t("ui.fallbacks.notAdded")} />
          <Info label={t("ui.labels.location")} value={location} fallback={t("ui.fallbacks.notAdded")} />
          <Info label={t("ui.labels.address")} value={user.address} fallback={t("ui.fallbacks.notAdded")} />
          <Info label={t("ui.labels.joined")} value={formatDate(user.created_at, t("ui.fallbacks.notAdded"))} fallback={t("ui.fallbacks.notAdded")} />
        </div>

        {isFreelancer && (
          <div className={styles.card}>
            <h2>{t("ui.labels.freelancerProfile")}</h2>
            <Info label={t("common.labels.title")} value={freelancer?.title} fallback={t("ui.fallbacks.notAdded")} />
            <Info label={t("common.labels.category")} value={freelancer?.category} fallback={t("ui.fallbacks.notAdded")} />
            <Info label={t("ui.labels.portfolio")} value={freelancer?.portfolio_url} isLink fallback={t("ui.fallbacks.notAdded")} />
            <Info label={t("ui.labels.resume")} value={freelancer?.resume_url} isLink fallback={t("ui.fallbacks.notAdded")} />
            <Info label={t("ui.labels.totalProjects")} value={user.total_projects} fallback={t("ui.fallbacks.notAdded")} />
          </div>
        )}

        {!isFreelancer && (
          <div className={styles.card}>
            <h2>{t("ui.labels.clientActivity")}</h2>
            <Info label={t("ui.labels.totalProjects")} value={user.total_projects} fallback={t("ui.fallbacks.notAdded")} />
          </div>
        )}
      </section>

      {isFreelancer && freelancer?.bio && (
        <section className={styles.card}>
          <h2>{t("ui.labels.bio")}</h2>
          <p className={styles.text}>{freelancer.bio}</p>
        </section>
      )}

      {isFreelancer && (
        <section className={styles.card}>
          <h2>{t("common.labels.skills")}</h2>
          {freelancer?.skills?.length > 0 ? (
            <div className={styles.skills}>
              {freelancer.skills.map((skill) => (
                <span key={skill.id}>{skill.name}</span>
              ))}
            </div>
          ) : (
            <p className={styles.empty}>{t("ui.states.noSkillsAddedShort")}</p>
          )}
        </section>
      )}

      <section className={styles.totalCard}>
        <span>{isFreelancer ? t("ui.labels.relatedProjects") : t("ui.labels.clientProjects")}</span>
        <strong>{user.total_projects || 0}</strong>
      </section>
    </div>
  );
}

function Info({ label, value, isLink = false, fallback }) {
  const finalValue =
    value === null || value === undefined || value === "" ? fallback : value;

  return (
    <div className={styles.info}>
      <span>{label}</span>
      {isLink && value ? (
        <a href={value} target="_blank" rel="noreferrer">
          {value}
        </a>
      ) : (
        <strong>{finalValue}</strong>
      )}
    </div>
  );
}

function formatDate(date, fallback) {
  if (!date) {
    return fallback;
  }

  return new Date(date).toLocaleDateString();
}

export default UserDetails;
