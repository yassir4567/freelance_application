import styles from "../styles/FreelancerProjectsFilter.module.css";

function FreelancerProjectsFilter({ filters, onChange }) {
  return (
    <div className={styles.SideBarFilters}>
      <div className={styles.filterBox}>
        <label className={styles.label}>Price</label>
        <div className={styles.filterItems}>
          <div className={styles.filterItem}>
            <input
              id="0-50"
              type="radio"
              name="price"
              value="0-50"
              checked={filters.price === "0-50"}
              onChange={onChange}
            />
            <label htmlFor="0-50">Less than $50</label>
          </div>
          <div className={styles.filterItem}>
            <input
              id="50-100"
              type="radio"
              name="price"
              value="50-100"
              checked={filters.price === "50-100"}
              onChange={onChange}
            />
            <label htmlFor="50-100">$50 to $100</label>
          </div>
          <div className={styles.filterItem}>
            <input
              id="100-200"
              type="radio"
              name="price"
              value="100-200"
              checked={filters.price === "100-200"}
              onChange={onChange}
            />
            <label htmlFor="100-200">$100 to $200</label>
          </div>
          <div className={styles.filterItem}>
            <input
              id="200+"
              type="radio"
              name="price"
              value="200+"
              checked={filters.price === "200+"}
              onChange={onChange}
            />
            <label htmlFor="200+">$200+</label>
          </div>
        </div>
      </div>

      <div className={styles.filterBox}>
        <label className={styles.label}>Experience Level</label>
        <div className={styles.filterItems}>
          <div className={styles.filterItem}>
            <input
              id="junior"
              type="radio"
              name="experience"
              value="junior"
              checked={filters.experience === "junior"}
              onChange={onChange}
            />
            <label htmlFor="junior">Junior</label>
          </div>
          <div className={styles.filterItem}>
            <input
              id="mid-level"
              type="radio"
              name="experience"
              value="mid-level"
              checked={filters.experience === "mid-level"}
              onChange={onChange}
            />
            <label htmlFor="mid-level">Mid Level</label>
          </div>
          <div className={styles.filterItem}>
            <input
              id="senior"
              type="radio"
              name="experience"
              value="senior"
              checked={filters.experience === "senior"}
              onChange={onChange}
            />
            <label htmlFor="senior">Senior</label>
          </div>
        </div>
      </div>

      <div className={styles.filterBox}>
        <label className={styles.label}>Project size</label>
        <div className={styles.filterItems}>
          <div className={styles.filterItem}>
            <input
              id="small"
              type="radio"
              name="size"
              value="small"
              checked={filters.size === "small"}
              onChange={onChange}
            />
            <label htmlFor="small">Small</label>
          </div>
          <div className={styles.filterItem}>
            <input
              id="medium"
              type="radio"
              name="size"
              value="medium"
              checked={filters.size === "medium"}
              onChange={onChange}
            />
            <label htmlFor="medium">Medium</label>
          </div>
          <div className={styles.filterItem}>
            <input
              id="large"
              type="radio"
              name="size"
              value="large"
              checked={filters.size === "large"}
              onChange={onChange}
            />
            <label htmlFor="large">Large</label>
          </div>
        </div>
      </div>

      <div className={styles.filterBox}>
        <label className={styles.label}>Number of proposals</label>
        <div className={styles.filterItems}>
          <div className={styles.filterItem}>
            <input
              type="radio"
              id="0-5"
              name="nbr_proposals"
              value="0-5"
              checked={filters.nbr_proposals === "0-5"}
              onChange={onChange}
            />
            <label htmlFor="0-5">Less than 5</label>
          </div>
          <div className={styles.filterItem}>
            <input
              type="radio"
              id="5-15"
              name="nbr_proposals"
              value="5-15"
              checked={filters.nbr_proposals === "5-15"}
              onChange={onChange}
            />
            <label htmlFor="5-15">5 to 15</label>
          </div>
          <div className={styles.filterItem}>
            <input
              type="radio"
              id="15-25"
              name="nbr_proposals"
              value="15-25"
              checked={filters.nbr_proposals === "15-25"}
              onChange={onChange}
            />
            <label htmlFor="15-25">15 to 25</label>
          </div>
          <div className={styles.filterItem}>
            <input
              type="radio"
              id="25-50"
              name="nbr_proposals"
              value="25-50"
              checked={filters.nbr_proposals === "25-50"}
              onChange={onChange}
            />
            <label htmlFor="25-50">25 to 50</label>
          </div>
          <div className={styles.filterItem}>
            <input
              type="radio"
              id="+50"
              name="nbr_proposals"
              value="50+"
              checked={filters.nbr_proposals === "50+"}
              onChange={onChange}
            />
            <label htmlFor="+50">+50</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreelancerProjectsFilter;
