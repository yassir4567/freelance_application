import { CiSearch } from "react-icons/ci";
import styles from "./FilterBox.module.css";

function FilterBox({
  inputValues,
  statusValues,
  handleInputsChange,
  handleClearFilters,
}) {
  return (
    <div className={styles.FilterSection}>
      <div className={styles.searchBox}>
        <CiSearch className={styles.searchIcon} size={30} />
        <input
          type="text"
          name="search"
          value={inputValues.search}
          onChange={handleInputsChange}
          className={styles.searchInput}
          placeholder="Search ..."
        />
      </div>

      <div className={styles.StatusBox}>
        <select
          name="status"
          value={inputValues.status}
          onChange={handleInputsChange}
        >
          <option value="" disabled>
            Filter by status
          </option>
          {statusValues.map((status) => {
            return (
              <option key={status} value={status}>
                {status[0].toUpperCase()}
                {status.slice(1).toLowerCase()}
              </option>
            );
          })}
        </select>
      </div>

      <div className={styles.sortBox}>
        <select
          name="sortedby"
          value={inputValues.sortedby}
          onChange={handleInputsChange}
        >
          <option value="" disabled>
            Sort by
          </option>
          <option value="newest">Latest contracts</option>
          <option value="oldest">Oldest contracts</option>
        </select>
      </div>
      <div className={styles.clearAllFilters}>
        <button onClick={handleClearFilters}>Clear all</button>
      </div>
    </div>
  );
}

export default FilterBox;
