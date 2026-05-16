import styles from "./FilterBox.module.css";
import Search from "../../ui/Search";
import { useTranslation } from "react-i18next";

function FilterBox({
  inputValues,
  statusValues,
  handleInputsChange,
  handleClearFilters,
}) {
  const { t } = useTranslation();
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
            {t("common.filters.status")}
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
          name="sort"
          value={inputValues.sort}
          onChange={handleInputsChange}
        >
          <option value="" disabled>
            {t("common.filters.sortBy")}
          </option>
          <option value="newest">{t("common.options.sort.latest")}</option>
          <option value="oldest">{t("common.options.sort.oldest")}</option>
        </select>
      </div>
      <div className={styles.clearAllFilters}>
        <button onClick={handleClearFilters}>{t("common.actions.clearAll")}</button>
      </div>
    </div>
  );
}

export default FilterBox;
