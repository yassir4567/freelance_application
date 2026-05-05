import { useState } from "react";
import ProfileAddress from "../components/forms/ProfileAddress";
import ProfileInformation from "../components/forms/ProfileInformation";
import ProfileSideBar from "../components/ProfileSideBar";
import styles from "../styles/ProfilePage.module.css";
import { useAuth } from "../../../context/AuthContext";
import updateClientProfile from "../../../api/profiles/updateClientProfile";
import AboutMe from "../components/forms/AboutMe";
function ProfilePage() {
  const { user, setUser } = useAuth();
  const [isEdited, setIsEdited] = useState(false);

  const [personalInformationForm, setPersonalInformationForm] = useState({
    first_name: user.first_name || "Unregistered",
    last_name: user.last_name || "Unregistered",
    phone: user.phone || "Unregistered",
  });

  const [profileAddress, setProfileAddress] = useState({
    address: user.address || "Unregistered",
    country: user.country || "Unregistered",
    city: user.city || "Unregistered",
  });

  const [aboutFreelancer, setAboutFreelancer] = useState({
    title: user.freelancer.title || "Unregistered",
    bio: user.freelancer.bio || "Unregistered",
    portfolio: user.freelancer.portfolio || "http://...",
  });

  const handleOpenEdit = () => {
    setIsEdited(true);
  };

  const handleSaveEdit = async () => {
    if (user.role === "client") {
      const payload = {
        ...personalInformationForm,
        ...profileAddress,
      };

      const result = await updateClientProfile(payload);
      setUser(result.data);
      setIsEdited(false);
    }
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Profile information</h2>
        {isEdited ? (
          <button className={styles.save} onClick={handleSaveEdit}>
            Save
          </button>
        ) : (
          <button className={styles.editButton} onClick={handleOpenEdit}>
            Edit profile
          </button>
        )}
      </div>

      <form className={styles.main}>
        <ProfileInformation
          isEdited={isEdited}
          form={personalInformationForm}
          setForm={setPersonalInformationForm}
        />
        <ProfileAddress
          isEdited={isEdited}
          form={profileAddress}
          setForm={setProfileAddress}
        />
        {user.role === "freelancer" && (
          <AboutMe
            isEdited={isEdited}
            form={aboutFreelancer}
            setForm={setAboutFreelancer}
          />
        )}
      </form>
    </div>
  );
}

export default ProfilePage;
