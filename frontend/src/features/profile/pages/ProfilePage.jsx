import { useState } from "react";
import ProfileAddress from "../components/forms/ProfileAddress";
import ProfileInformation from "../components/forms/ProfileInformation";
import ProfileSideBar from "../components/ProfileSideBar";
import styles from "../styles/ProfilePage.module.css";
import { useAuth } from "../../../context/AuthContext";
import updateClientProfile from "../../../api/profiles/updateClientProfile";
import AboutMe from "../components/forms/AboutMe";
import updateFreelancerProfile from "../../../api/profiles/updateFreelancerProfile";
function ProfilePage() {
  const { user, setUser } = useAuth();
  const [isEdited, setIsEdited] = useState(false);

  const [personalInformationForm, setPersonalInformationForm] = useState({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    phone: user.phone || "",
  });

  const [profileAddress, setProfileAddress] = useState({
    address: user.address || "",
    country: user.country || "",
    city: user.city || "",
  });

  const [aboutFreelancer, setAboutFreelancer] = useState({
    title: user.freelancer?.title || "",
    bio: user.freelancer?.bio || "",
    portfolio: user.freelancer?.portfolio || "",
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

    if (user.role === "freelancer") {
      const payload = {
        ...personalInformationForm,
        ...profileAddress,
        ...aboutFreelancer,
      };

      const result = await updateFreelancerProfile(payload)
      console.log(result);
      
      setUser(result.data)
      setIsEdited(false)

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
