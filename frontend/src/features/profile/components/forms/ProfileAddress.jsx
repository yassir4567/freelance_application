import styles from "../../styles/ProfileAddress.module.css";
import { useTranslation } from "react-i18next";

function ProfileAddress({ isEdited, form, setForm }) {
  const { t } = useTranslation();
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("profile.addressInformation")}</h2>

      <div>
        <div className={styles.row}>
          <div className={styles.inputBox}>
            <label>{t("ui.labels.address")}</label>
            <input
              type="text"
              name="address"
              value={form.address}
              placeholder={t("ui.fallbacks.unregistered")}
              onChange={handleOnChange}
              disabled={!isEdited}
            />
          </div>
          <div className={styles.inputBox}>
            <label>{t("ui.labels.country")}</label>
            <input
              type="text"
              name="country"
              value={form.country}
              placeholder={t("ui.fallbacks.unregistered")}
              onChange={handleOnChange}
              disabled={!isEdited}
            />
          </div>
          <div className={styles.inputBox}>
            <label>{t("ui.labels.city")}</label>
            <input
              type="text"
              name="city"
              value={form.city}
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

export default ProfileAddress;
