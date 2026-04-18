import styles from "./FreelancerProjectsFilter.module.css";

function FreelancerProjectsFilter() {
  return (
    <div className={styles.SideBarFilters}>
      <div className={styles.filterBox}>
        <label className={styles.label}>Price</label>
        <div className={styles.filterItems}>
          <div className={styles.filterItem}>
            <input type="checkbox" />
            <span>Less than $50</span>
          </div>
          <div className={styles.filterItem}>
            <input type="checkbox" />
            <span>$50 to $100</span>
          </div>
          <div className={styles.filterItem}>
            <input type="checkbox" />
            <span>$100 to $200</span>
          </div>
          <div className={styles.filterItem}>
            <input type="checkbox" />
            <span>$200+</span>
          </div>
        </div>
      </div>

      <div className={styles.filterBox}>
        <label className={styles.label}>Experience Level</label>
        <div className={styles.filterItems}>
          <div className={styles.filterItem}>
            <input type="checkbox" value="junior" />
            <span>Junior</span>
          </div>
          <div className={styles.filterItem}>
            <input type="checkbox" value="mid-level" />
            <span>Mid Level</span>
          </div>
          <div className={styles.filterItem}>
            <input type="checkbox" value="senior" />
            <span>Senior</span>
          </div>
        </div>
      </div>

      <div className={styles.filterBox}>
        <label className={styles.label}>Project size</label>
        <div className={styles.filterItems}>
          <div className={styles.filterItem}>
            <input type="checkbox" value="small" />
            <span>Small</span>
          </div>
          <div className={styles.filterItem}>
            <input type="checkbox" value="medium" />
            <span>Medium</span>
          </div>
          <div className={styles.filterItem}>
            <input type="checkbox" value="large" />
            <span>Large</span>
          </div>
        </div>
      </div>

      <div className={styles.filterBox}>
        <label className={styles.label}>Number of proposals</label>
        <div className={styles.filterItems}>
          <div className={styles.filterItem}>
            <input type="checkbox" />
            <span>Less than 5</span>
          </div>
          <div className={styles.filterItem}>
            <input type="checkbox" />
            <span>5 to 15</span>
          </div>
          <div className={styles.filterItem}>
            <input type="checkbox" />
            <span>15 to 25</span>
          </div>
          <div className={styles.filterItem}>
            <input type="checkbox" />
            <span>25 to 50</span>
          </div>
          <div className={styles.filterItem}>
            <input type="checkbox" />
            <span>+50</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreelancerProjectsFilter;
