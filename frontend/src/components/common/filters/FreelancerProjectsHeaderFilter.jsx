import styles from "./FreelancerProjectsHeaderFilter.module.css";

function FreelancerProjectsHeaderFilter() {
  const categories = ["Full stack developer", "Ui/Ux designer", "Ai enginner"];

  return (
    <div className={styles.headerFilter}>
      <div className={styles.filterItem}>
        <select name="category">
          <option value="">Select category</option>
          {categories.map((category, index) => (
            <option key={index}>{category}</option>
          ))}
        </select>
      </div>

      <div className={styles.filterItem}>
        <select name="sortby">
          <option value="">Sort by</option>
          <option value="most-recent">Most Recent</option>
          <option value="best-matches">Best Matches</option>
        </select>
      </div>
    </div>
  );
}

export default FreelancerProjectsHeaderFilter;
