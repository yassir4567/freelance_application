import { useTranslation } from "react-i18next";
import styles from "../styles/FreelancerProjectsHeaderFilter.module.css";

function FreelancerProjectsHeaderFilter({ filters, onChange, categories }) {
  const { t } = useTranslation();

  return (
    <div className={styles.headerFilter}>
      <div className={styles.filterItem}>
        <select
          name="category_id"
          value={filters.category_id}
          onChange={onChange}
        >
          <option value="" disabled>
            {t("browseProjects.filters.category")}
          </option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterItem}>
        <select name="sort" value={filters.sort} onChange={onChange}>
          <option value="" disabled>
            {t("browseProjects.filters.sort.placeholder")}
          </option>
          <option value="most_recent">
            {t("browseProjects.filters.sort.recent")}
          </option>
          <option value="best_match">
            {t("browseProjects.filters.sort.match")}
          </option>
        </select>
      </div>
    </div>
  );
}

export default FreelancerProjectsHeaderFilter;
