import { useTranslation } from "react-i18next";
import styles from "../styles/FreelancerProjectsHeaderFilter.module.css";
import type { Category } from "../../../types/category.types";
import type { BrowseProjectsObjectFilters } from "../hooks/useBrowseProjectsFilters";
import type React from "react";

type FreelancerProjectsHeaderFilterProps = {
  filters: BrowseProjectsObjectFilters;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  categories: Category[];
};

function FreelancerProjectsHeaderFilter({
  filters,
  onChange,
  categories,
}: FreelancerProjectsHeaderFilterProps) {
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
          {categories?.map((category: Category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterItem}>
        <select name="sort" value={filters.sort} onChange={onChange}>
          <option value="" disabled>
            {t("common.filters.sortBy")}
          </option>
          <option value="most_recent">{t("common.options.sort.recent")}</option>
          <option value="best_match">{t("common.options.sort.match")}</option>
        </select>
      </div>
    </div>
  );
}

export default FreelancerProjectsHeaderFilter;
