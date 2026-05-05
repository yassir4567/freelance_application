import { useState } from "react";
import ProfileAddress from "../components/forms/ProfileAddress";
import ProfileInformation from "../components/forms/ProfileInformation";
import ProfileSideBar from "../components/ProfileSideBar";
import styles from "../styles/ProfilePage.module.css";
import { useAuth } from "../../../context/AuthContext";
function ProfilePage() {
  const { user } = useAuth();
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

  console.log(user);

  const handleOpenEdit = () => {
    setIsEdited(true);
  };

  const handleSaveEdit = () => {
    setIsEdited(false);
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
      </form>
    </div>
  );
}

export default ProfilePage;
