import styles from "../styles/FreelancerProjectsHeaderFilter.module.css";

function FreelancerProjectsHeaderFilter({ filters, onChange, categories }) {
  return (
    <div className={styles.headerFilter}>
      <div className={styles.filterItem}>
        <select
          name="category_id"
          value={filters.category_id}
          onChange={onChange}
        >
          <option value="" disabled>
            Select category
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
            Sort by
          </option>
          <option value="most_recent">Most Recent</option>
          <option value="best_match">Best Matches</option>
        </select>
      </div>
    </div>
  );
}

export default FreelancerProjectsHeaderFilter;
