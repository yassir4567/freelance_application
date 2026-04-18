import styles from "./FilterBox.module.css";
import Search from "../../ui/Search";

function FilterBox({
  inputValues,
  statusValues,
  handleInputsChange,
  handleClearFilters,
}) {
  return (
    <div className={styles.FilterSection}>

      <Search value={inputValues.search} onChange={handleInputsChange} />

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
              <option key={status} value={status} className={styles.option}>
                {status.split("_").join(" ")}
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
