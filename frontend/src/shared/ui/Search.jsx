import { CiSearch } from "react-icons/ci";
import styles from "./Search.module.css";
import { useTranslation } from "react-i18next";

function Search({value , onChange}) {
  const {t} = useTranslation()
  return (
    <div className={styles.searchBox}>
      <CiSearch className={styles.searchIcon} size={30} />
      <input
        type="text"
        name="search"
        value={value}
        onChange={onChange}
        className={styles.searchInput}
        placeholder={t("clientProjects.filters.search")}
      />
    </div>
  );
}

export default Search;
