import styles from "../styles/PostProjectForm.module.css";
import { MdRemove } from "react-icons/md";
import { useTranslation } from "react-i18next";
import useCategories, {
  type CategoryHookType,
} from "../../../hooks/useCategories";
import usePostProjectForm, {
  type UsePostProjectFormReturn,
} from "../hooks/usePostProjectForm";
import type { Skill } from "../../../types/skill.types";

type PostProjectFormProps = {
  is_profile_complete: boolean;
};

function PostProjectForm({ is_profile_complete }: PostProjectFormProps) {
  const { t } = useTranslation();
  const { categories, isLoading, error }: CategoryHookType = useCategories();
  const {
    skillsOptions,
    project,
    errors,
    handleInputChange,
    handleSubmit,
    handleRemoveSkill,
  }: UsePostProjectFormReturn = usePostProjectForm();

  if (isLoading) return <p>Loading</p>;
  if (error) return <p>{error}</p>;
  if (!categories) return null;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.row}>
        <div className={styles.inputBox}>
          <label>{t("common.labels.title")}</label>
          <input
            className={styles.select}
            type="text"
            value={project.title}
            onChange={handleInputChange}
            name="title"
            placeholder={t("postjob.form.title.placeholder")}
            disabled={!is_profile_complete}
          />
          {errors.title && <div className={styles.error}>{errors.title}</div>}
        </div>
        <div className={styles.inputBox}>
          <label>{t("common.labels.category")}</label>
          <select
            className={styles.select}
            value={project.category_id}
            onChange={handleInputChange}
            name="category_id"
            disabled={!is_profile_complete}
          >
            <option value="" disabled>
              {t("postjob.form.category.placeholder")}
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <div className={styles.error}>{errors.category_id}</div>
          )}
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.inputBox}>
          <label>{t("common.labels.skills")}</label>
          <select
            className={styles.select}
            value=""
            onChange={handleInputChange}
            name="skills"
            disabled={
              !project.category_id ||
              skillsOptions.length === 0 ||
              !is_profile_complete
            }
          >
            <option value="" disabled>
              {!project.category_id
                ? t("postjob.form.skills.placeholders.categoryNotSelected")
                : skillsOptions.length === 0
                  ? t("postjob.form.skills.placeholders.noSkillsAvailable")
                  : t("postjob.form.skills.placeholders.main")}
            </option>
            {skillsOptions.map((skill: Skill) => (
              <option key={skill.id} value={skill.id}>
                {skill.name}
              </option>
            ))}
          </select>
          {errors.skills && <div className={styles.error}>{errors.skills}</div>}
        </div>
        <div className={styles.selectedSkills}>
          {project.skills.map((skill: Skill) => (
            <div key={skill.id} className={styles.skill}>
              <span>{skill.name}</span>
              <button onClick={(e) => handleRemoveSkill(e, skill.id)}>
                <MdRemove />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.tripleRow}>
        <div className={styles.radioInput}>
          <p className={styles.radioBoxTitle}>
            {t("postjob.form.experienceLevel.label")}
          </p>
          <div className={styles.radioBox}>
            <input
              className={styles.select}
              type="radio"
              value="junior"
              onChange={handleInputChange}
              id="junior"
              name="experience_level"
              checked={project.experience_level === "junior"}
              disabled={!is_profile_complete}
            />
            <label htmlFor="junior">
              {t("common.options.experience.junior")}
            </label>
          </div>
          <div className={styles.radioBox}>
            <input
              className={styles.select}
              type="radio"
              value="mid-level"
              onChange={handleInputChange}
              id="midlevel"
              name="experience_level"
              checked={project.experience_level === "mid-level"}
              disabled={!is_profile_complete}
            />
            <label htmlFor="midlevel">
              {t("common.options.experience.midLevel")}
            </label>
          </div>
          <div className={styles.radioBox}>
            <input
              className={styles.select}
              type="radio"
              value="senior"
              onChange={handleInputChange}
              id="senior"
              name="experience_level"
              checked={project.experience_level === "senior"}
              disabled={!is_profile_complete}
            />
            <label htmlFor="senior">
              {t("common.options.experience.senior")}
            </label>
          </div>
          {errors.experience_level && (
            <div className={styles.error}>{errors.experience_level}</div>
          )}
        </div>

        <div className={styles.radioInput}>
          <p className={styles.radioBoxTitle}>
            {t("postjob.form.projectSize.label")}
          </p>
          <div className={styles.radioBox}>
            <input
              className={styles.select}
              type="radio"
              value="small"
              onChange={handleInputChange}
              id="small"
              name="size"
              checked={project.size === "small"}
              disabled={!is_profile_complete}
            />
            <label htmlFor="small">{t("common.options.size.small")}</label>
          </div>
          <div className={styles.radioBox}>
            <input
              className={styles.select}
              type="radio"
              value="medium"
              onChange={handleInputChange}
              id="medium"
              name="size"
              checked={project.size === "medium"}
              disabled={!is_profile_complete}
            />
            <label htmlFor="medium">{t("common.options.size.medium")}</label>
          </div>
          <div className={styles.radioBox}>
            <input
              className={styles.select}
              type="radio"
              value="large"
              onChange={handleInputChange}
              id="large"
              name="size"
              checked={project.size === "large"}
              disabled={!is_profile_complete}
            />
            <label htmlFor="large">{t("common.options.size.large")}</label>
          </div>
          {errors.size && <div className={styles.error}>{errors.size}</div>}
        </div>

        <div className={styles.radioInput}>
          <p className={styles.radioBoxTitle}>
            {t("postjob.form.duration.label")}
          </p>
          <div className={styles.radioBox}>
            <input
              className={styles.select}
              type="radio"
              value="less_than_1_month"
              onChange={handleInputChange}
              id="less1"
              name="duration"
              checked={project.duration === "less_than_1_month"}
              disabled={!is_profile_complete}
            />
            <label htmlFor="less1">
              {t("common.options.duration.lessThanOneMonth")}
            </label>
          </div>
          <div className={styles.radioBox}>
            <input
              className={styles.select}
              type="radio"
              value="1_to_3_month"
              onChange={handleInputChange}
              id="between_1_3"
              name="duration"
              checked={project.duration === "1_to_3_month"}
              disabled={!is_profile_complete}
            />
            <label htmlFor="between_1_3">
              {t("common.options.duration.oneToThreeMonths")}
            </label>
          </div>
          <div className={styles.radioBox}>
            <input
              className={styles.select}
              type="radio"
              value="3_to_6_month"
              onChange={handleInputChange}
              id="between_3_6"
              name="duration"
              checked={project.duration === "3_to_6_month"}
              disabled={!is_profile_complete}
            />
            <label htmlFor="between_3_6">
              {t("common.options.duration.threeToSixMonths")}
            </label>
          </div>
          <div className={styles.radioBox}>
            <input
              className={styles.select}
              type="radio"
              value="more_than_6_month"
              onChange={handleInputChange}
              id="more6"
              name="duration"
              checked={project.duration === "more_than_6_month"}
              disabled={!is_profile_complete}
            />
            <label htmlFor="more6">
              {t("common.options.duration.moreThanSixMonths")}
            </label>
          </div>
          {errors.duration && (
            <div className={styles.error}>{errors.duration}</div>
          )}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.inputBox}>
          <label htmlFor="description">{t("common.labels.description")}</label>
          <textarea
            name="description"
            className={styles.textarea}
            id="description"
            value={project.description}
            onChange={handleInputChange}
            placeholder={t("postjob.form.description.placeholder")}
            disabled={!is_profile_complete}
          />
          {errors.description && (
            <div className={styles.error}>{errors.description}</div>
          )}
        </div>
        <div className={styles.inputBox}>
          <label htmlFor="budget">{t("postjob.form.budget.label")}</label>
          <input
            className={styles.select}
            type="number"
            id="budget"
            name="budget"
            value={project.budget}
            onChange={handleInputChange}
            placeholder={t("postjob.form.budget.placeholder")}
            disabled={!is_profile_complete}
          />
          {errors.budget && <div className={styles.error}>{errors.budget}</div>}
        </div>
      </div>
      <button type="submit" className={styles.post_job_btn}>
        {t("postjob.form.submit")}
      </button>
    </form>
  );
}

export default PostProjectForm;
