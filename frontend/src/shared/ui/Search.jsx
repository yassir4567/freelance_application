import { CiSearch } from "react-icons/ci";
import styles from "./Search.module.css";

function Search({value , onChange}) {
  return (
    <div className={styles.searchBox}>
      <CiSearch className={styles.searchIcon} size={30} />
      <input
        type="text"
        name="search"
        value={value}
        onChange={onChange}
        className={styles.searchInput}
        placeholder="Search ..."
      />
    </div>
  );
}

export default Search;
