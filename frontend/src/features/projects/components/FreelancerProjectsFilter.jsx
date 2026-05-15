import { useTranslation } from "react-i18next";
import styles from "../styles/FreelancerProjectsFilter.module.css";

function FreelancerProjectsFilter({ filters, onChange }) {
  const { t } = useTranslation();

  return (
    <div className={styles.SideBarFilters}>
      <div className={styles.filterBox}>
        <label className={styles.label}>
          {t("common.labels.price")}
        </label>
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
            <label htmlFor="0-50">
              {t("browseProjects.filters.price.options.lessThan50")}
            </label>
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
            <label htmlFor="50-100">
              {t("browseProjects.filters.price.options.50to100")}
            </label>
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
            <label htmlFor="100-200">
              {t("browseProjects.filters.price.options.100to200")}
            </label>
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
            <label htmlFor="200+">
              {t("browseProjects.filters.price.options.plus200")}
            </label>
          </div>
        </div>
      </div>

      <div className={styles.filterBox}>
        <label className={styles.label}>
          {t("common.labels.experienceLevel")}
        </label>
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
            <label htmlFor="junior">
              {t("common.options.experience.junior")}
            </label>
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
            <label htmlFor="mid-level">
              {t("common.options.experience.midLevel")}
            </label>
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
            <label htmlFor="senior">
              {t("common.options.experience.senior")}
            </label>
          </div>
        </div>
      </div>

      <div className={styles.filterBox}>
        <label className={styles.label}>
          {t("common.labels.projectSize")}
        </label>
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
            <label htmlFor="small">
              {t("common.options.size.small")}
            </label>
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
            <label htmlFor="medium">
              {t("common.options.size.medium")}
            </label>
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
            <label htmlFor="large">
              {t("common.options.size.large")}
            </label>
          </div>
        </div>
      </div>

      <div className={styles.filterBox}>
        <label className={styles.label}>
          {t("common.labels.numberOfProposals")}
        </label>
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
            <label htmlFor="0-5">
              {t("browseProjects.filters.proposals.options.lessThan5")}
            </label>
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
            <label htmlFor="5-15">
              {t("browseProjects.filters.proposals.options.5to15")}
            </label>
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
            <label htmlFor="15-25">
              {t("browseProjects.filters.proposals.options.15to25")}
            </label>
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
            <label htmlFor="25-50">
               {t("browseProjects.filters.proposals.options.25to50")}
            </label>
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
            <label htmlFor="+50">
              {t("browseProjects.filters.proposals.options.plus50")}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreelancerProjectsFilter;
