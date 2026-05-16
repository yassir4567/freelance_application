import styles from "../../styles/ProfileInformation.module.css";
import { useTranslation } from "react-i18next";

function ProfileInformation({ isEdited, form, setForm }) {
  const { t } = useTranslation();
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("profile.personalInformation")}</h2>

      <div>
        <div className={styles.row}>
          <div className={styles.inputBox}>
            <label>{t("ui.labels.firstName")}</label>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              placeholder={t("ui.fallbacks.unregistered")}
              onChange={handleOnChange}
              disabled={!isEdited}
            />
          </div>
          <div className={styles.inputBox}>
            <label>{t("ui.labels.lastName")}</label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              placeholder={t("ui.fallbacks.unregistered")}
              onChange={handleOnChange}
              disabled={!isEdited}
            />
          </div>
          <div className={styles.inputBox}>
            <label>{t("ui.labels.phone")}</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              placeholder={t("ui.fallbacks.unregistered")}
              onChange={handleOnChange}
              disabled={!isEdited}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInformation;
