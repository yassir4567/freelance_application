import { useState } from "react";
import styles from "../styles/PostProjectForm.module.css";
import { MdRemove } from "react-icons/md";
import { emptyText, emptyArray } from "../../../utils/helpers";

function PostProjectForm() {
  const [skills, setSkills] = useState([]);
  const [project, setProject] = useState({
    title: "",
    category: "",
    skills: [],
    experience: "",
    size: "",
    duration: "",
    description: "",
    budget: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    category: "",
    skills: "",
    experience: "",
    size: "",
    duration: "",
    description: "",
    budget: "",
  });

  const categories = [
    "Web Development",
    "Mobile Development",
    "Design",
    "Writing",
    "Marketing",
    "Data Science",
  ];

  const skills = {
    "Web Development": ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    "Mobile Development": ["Flutter", "React Native", "Swift", "Kotlin"],
    Design: ["Adobe Photoshop", "Illustrator", "Figma", "Sketch"],
    Writing: ["Content Writing", "Copywriting", "Technical Writing"],
    Marketing: ["SEO", "Social Media Marketing", "Email Marketing"],
    "Data Science": ["Python", "R", "Machine Learning", "Data Analysis"],
  };

  const skillsOptions = project.category
    ? (skills[project.category] || []).filter(
        (skill) => !project.skills.includes(skill),
      )
    : [];

  // * Handle inputs onChange
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      setProject((prevProject) => ({
        ...prevProject,
        category: value,
        skills: [],
      }));
      return;
    }
    if (name === "skills") {
      setProject((prevProject) => ({
        ...prevProject,
        skills: [...prevProject.skills, value],
      }));
      return;
    }
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  // *
  const handleRemoveSkill = (e, skill) => {
    e.preventDefault();
    setProject((prev) => ({
      ...prev,
      skills: prev.skills.filter((sk) => sk !== skill),
    }));
  };

  // * submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // * Validate inputs
    if (emptyText(project.title)) {
      newErrors.title = "Title is required";
    }

    if (emptyText(project.category)) {
      newErrors.category = "Category is required";
      newErrors.skills = "Please select category first";
    }

    if (!emptyText(project.category) && emptyArray(project.skills)) {
      newErrors.skills = "Please select at least one skill";
    }

    if (emptyText(project.experience)) {
      newErrors.experience = "lease select at experience level";
    }
    if (emptyText(project.size)) {
      newErrors.size = "Please select the project size";
    }
    if (emptyText(project.duration)) {
      newErrors.duration = "Please select the project duration";
    }

    if (emptyText(project.description)) {
      newErrors.description = "Description is required";
    } else if (project.description.length < 30) {
      newErrors.description = "Description must be at least 30 characters";
    }

    if (emptyText(project.budget)) {
      newErrors.budget = "Budget is required";
    } else if (+project.budget < 0) {
      newErrors.budget = "Budget must be greater than 0";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    // * if no errors send the job to the backend
  };

  return (
    <form action="" onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.row}>
        <div className={styles.inputBox}>
          <label>Title</label>
          <input
            className={styles.select}
            type="text"
            value={project.title}
            onChange={handleInputChange}
            name="title"
            placeholder="Enter your project title"
          />
          {errors.title && <div className={styles.error}>{errors.title}</div>}
        </div>
        <div className={styles.inputBox}>
          <label>Category</label>
          <select
            className={styles.select}
            value={project.category}
            onChange={handleInputChange}
            name="category"
          >
            <option value="" disabled>
              Select project category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <div className={styles.error}>{errors.category}</div>
          )}
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.inputBox}>
          <label>Skills</label>
          <select
            className={styles.select}
            value=""
            onChange={handleInputChange}
            name="skills"
          >
            <option value="" disabled>
              Select required skills
            </option>
            {skillsOptions.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
          {errors.skills && <div className={styles.error}>{errors.skills}</div>}
        </div>
        <div className={styles.selectedSkills}>
          {project.skills.map((skill) => (
            <div key={skill} className={styles.skill}>
              <span>{skill}</span>
              <button onClick={(e) => handleRemoveSkill(e, skill)}>
                <MdRemove />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.tripleRow}>
        <div className={styles.radioInput}>
          <p className={styles.radioBoxTitle}>Experience Level</p>
          <div className={styles.radioBox}>
            <input
              className={styles.select}
              type="radio"
              value="junior"
              onChange={handleInputChange}
              id="junior"
              name="experience"
              checked={project.experience === "junior"}
            />
            <label htmlFor="junior">Junior</label>
          </div>
          <div className={styles.radioBox}>
            <input
              className={styles.select}
              type="radio"
              value="mid-level"
              onChange={handleInputChange}
              id="midlevel"
              name="experience"
              checked={project.experience === "mid-level"}
            />
            <label htmlFor="midlevel">Mid-Level</label>
          </div>
          <div className={styles.radioBox}>
            <input
              className={styles.select}
              type="radio"
              value="senior"
              onChange={handleInputChange}
              id="senior"
              name="experience"
              checked={project.experience === "senior"}
            />
            <label htmlFor="senior">Senior</label>
          </div>
          {errors.experience && (
            <div className={styles.error}>{errors.experience}</div>
          )}
        </div>

        <div className={styles.radioInput}>
          <p className={styles.radioBoxTitle}>Project Size</p>
          <div className={styles.radioBox}>
            <input
              className={styles.select}
              type="radio"
              value="small"
              onChange={handleInputChange}
              id="small"
              name="size"
              checked={project.size === "small"}
            />
            <label htmlFor="small">Small</label>
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
            />
            <label htmlFor="medium">Medium</label>
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
            />
            <label htmlFor="large">Large</label>
          </div>
          {errors.size && <div className={styles.error}>{errors.size}</div>}
        </div>

        <div className={styles.radioInput}>
          <p className={styles.radioBoxTitle}>How long will your work take ?</p>
          <div className={styles.radioBox}>
            <input
              className={styles.select}
              type="radio"
              value="less than 1 month"
              onChange={handleInputChange}
              id="less1"
              name="duration"
              checked={project.duration === "less than 1 month"}
            />
            <label htmlFor="less1">Less than 1 Months</label>
          </div>
          <div className={styles.radioBox}>
            <input
              className={styles.select}
              type="radio"
              value="1 to 3 months"
              onChange={handleInputChange}
              id="between_1_3"
              name="duration"
              checked={project.duration === "1 to 3 months"}
            />
            <label htmlFor="between_1_3">1 to 3 Months</label>
          </div>
          <div className={styles.radioBox}>
            <input
              className={styles.select}
              type="radio"
              value="3 to 6 months"
              onChange={handleInputChange}
              id="between_3_6"
              name="duration"
              checked={project.duration === "3 to 6 months"}
            />
            <label htmlFor="between_3_6">3 to 6 Months</label>
          </div>
          <div className={styles.radioBox}>
            <input
              className={styles.select}
              type="radio"
              value="more than 6 months"
              onChange={handleInputChange}
              id="more6"
              name="duration"
              checked={project.duration === "more than 6 months"}
            />
            <label htmlFor="more6">More than 6 Months</label>
          </div>
          {errors.duration && (
            <div className={styles.error}>{errors.duration}</div>
          )}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.inputBox}>
          <label htmlFor="description">
            Description (between 30 & 1000 character)
          </label>
          <textarea
            name="description"
            className={styles.textarea}
            id="description"
            value={project.description}
            onChange={handleInputChange}
            placeholder="Enter your project description"
          />
          {errors.description && (
            <div className={styles.error}>{errors.description}</div>
          )}
        </div>
        <div className={styles.inputBox}>
          <label htmlFor="budget">Fixed Budget</label>
          <input
            className={styles.select}
            type="number"
            id="budget"
            name="budget"
            value={project.budget}
            onChange={handleInputChange}
            placeholder="Enter your project budget"
          />
          {errors.budget && <div className={styles.error}>{errors.budget}</div>}
        </div>
      </div>
      <button type="submit" className={styles.post_job_btn}>
        Post
      </button>
    </form>
  );
}

export default PostProjectForm;
