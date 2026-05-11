import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getUserDetails } from "../../../api/admin/getUserDetails";
import styles from "../styles/UserDetails.module.css";

function UserDetails() {
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
        <p className={styles.state}>Loading user details...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>{error || "User not found"}</p>
        <NavLink to="/dashboard/admin/users" className={styles.backBtn}>
          Back to users
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
          Back
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
          <h2>Contact information</h2>
          <Info label="Phone" value={user.phone} />
          <Info label="Location" value={location} />
          <Info label="Address" value={user.address} />
          <Info label="Joined" value={formatDate(user.created_at)} />
        </div>

        {isFreelancer && (
          <div className={styles.card}>
            <h2>Freelancer profile</h2>
            <Info label="Title" value={freelancer?.title} />
            <Info label="Category" value={freelancer?.category} />
            <Info label="Portfolio" value={freelancer?.portfolio_url} isLink />
            <Info label="Resume" value={freelancer?.resume_url} isLink />
            <Info label="Total projects" value={user.total_projects} />
          </div>
        )}

        {!isFreelancer && (
          <div className={styles.card}>
            <h2>Client activity</h2>
            <Info label="Total projects" value={user.total_projects} />
          </div>
        )}
      </section>

      {isFreelancer && freelancer?.bio && (
        <section className={styles.card}>
          <h2>Bio</h2>
          <p className={styles.text}>{freelancer.bio}</p>
        </section>
      )}

      {isFreelancer && (
        <section className={styles.card}>
          <h2>Skills</h2>
          {freelancer?.skills?.length > 0 ? (
            <div className={styles.skills}>
              {freelancer.skills.map((skill) => (
                <span key={skill.id}>{skill.name}</span>
              ))}
            </div>
          ) : (
            <p className={styles.empty}>No skills added.</p>
          )}
        </section>
      )}

      <section className={styles.totalCard}>
        <span>{isFreelancer ? "Related projects" : "Client projects"}</span>
        <strong>{user.total_projects || 0}</strong>
      </section>
    </div>
  );
}

function Info({ label, value, isLink = false }) {
  const finalValue = value === null || value === undefined || value === "" ? "Not added" : value;

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

function formatDate(date) {
  if (!date) {
    return "Not added";
  }

  return new Date(date).toLocaleDateString();
}

export default UserDetails;
