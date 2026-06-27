import { useState } from "react";
import ProfileAddress from "../components/forms/ProfileAddress";
import ProfileInformation from "../components/forms/ProfileInformation";
import ProfileSideBar from "../components/ProfileSideBar";
import styles from "../styles/ProfilePage.module.css";
import { useAuth } from "../../../context/AuthContext";
import AboutMe from "../components/forms/AboutMe";
import { useTranslation } from "react-i18next";
import { profileApi } from "../../../api/profiles/profileApi";
function ProfilePage() {
  const { user, setUser } = useAuth();
  const { t } = useTranslation();
  const [isEdited, setIsEdited] = useState(false);

  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

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
    portfolio: user.freelancer?.portfolio_url || "",
    category_id: user.freelancer?.category_id || "",
  });

  const handleOpenEdit = () => {
    setIsEdited(true);
  };

  console.log(user);

  const handleSaveEdit = async () => {
    const role = user?.role;

    if (role === "client") {
      const payload = new FormData();
      const { first_name, last_name, phone } = personalInformationForm;
      const { address, country, city } = profileAddress;

      payload.append("first_name", first_name);
      payload.append("last_name", last_name);
      payload.append("phone", phone);
      payload.append("address", address);
      payload.append("country", country);
      payload.append("city", city);
      if (avatar) {
        payload.append("avatar", avatar);
      }

      const result = await profileApi.update(role, payload);

      setUser(result.data);
      setIsEdited(false);
    }

    if (role === "freelancer") {
      const payload = new FormData();
      const { first_name, last_name, phone } = personalInformationForm;
      const { address, country, city } = profileAddress;
      const { title, bio, portfolio, category_id } = aboutFreelancer;

      payload.append("first_name", first_name);
      payload.append("last_name", last_name);
      payload.append("phone", phone);
      payload.append("address", address);
      payload.append("country", country);
      payload.append("city", city);
      if (avatar) {
        payload.append("avatar", avatar);
      }
      payload.append("title", title);
      payload.append("bio", bio);
      payload.append("portfolio", portfolio);
      payload.append("category_id", category_id);

      const result = await profileApi.update(role, payload);

      setUser(result.data);
      setIsEdited(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.profileSideBar}>
        <ProfileSideBar
          setAvatar={setAvatar}
          preview={preview}
          setPreview={setPreview}
          isEdited={isEdited}
        />
      </div>
      <div className={styles.profilePage}>
        <div className={styles.header}>
          <h2 className={styles.pageTitle}>{t("profile.title")}</h2>
          {isEdited ? (
            <button className={styles.save} onClick={handleSaveEdit}>
              {t("ui.actions.save")}
            </button>
          ) : (
            <button className={styles.editButton} onClick={handleOpenEdit}>
              {t("ui.actions.editProfile")}
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
    </div>
  );
}

export default ProfilePage;
