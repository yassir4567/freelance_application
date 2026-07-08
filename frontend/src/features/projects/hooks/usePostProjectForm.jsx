import { useState } from "react";
import useSkills from "../../../hooks/useSkills";
import { useTranslation } from "react-i18next";
import { projectApi } from "../../../api/projects/projectApi";
import { useNavigate } from "react-router-dom";

const initProject = {
  title: "",
  category_id: "",
  skills: [],
  experience_level: "",
  size: "",
  duration: "",
  description: "",
  budget: "",
};

const initErrors = {
  category_id: "",
  title: "",
  skills: "",
  experience_level: "",
  size: "",
  duration: "",
  description: "",
  budget: "",
};

function usePostProjectForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [project, setProject] = useState(initProject);
  const [errors, setErrors] = useState(initErrors);
  const { skills } = useSkills();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "category_id") {
      setProject((prevProject) => ({
        ...prevProject,
        category_id: value,
        skills: [],
      }));
      return;
    }
    if (name === "skills") {
      const targetSkill = skills.find((sk) => +sk.id === +value);
      if (!targetSkill) return;

      setProject((prevProject) => ({
        ...prevProject,
        skills: [...prevProject.skills, targetSkill],
      }));
      return;
    }

    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    const newErrors = {};

    // * Validate inputs
    if (project.title.trim() === "") {
      newErrors.title = t("common.validation.titleRequired");
    }

    if (project.category_id.trim() === "") {
      newErrors.category_id = t("common.validation.categoryRequired");
    }

    if (project.category_id && project.skills.length === 0) {
      newErrors.skills = t("common.validation.skillsRequired");
    }

    if (project.experience_level.trim() === "") {
      newErrors.experience_level = t(
        "common.validation.experienceLevelRequired",
      );
    }

    if (project.size.trim() === "") {
      newErrors.size = t("common.validation.projectSizeRequired");
    }

    if (project.duration.trim() === "") {
      newErrors.duration = t("common.validation.durationRequired");
    }

    if (project.description.trim() === "") {
      newErrors.description = t("common.validation.descriptionRequired");
    } else if (project.description.length < 30) {
      newErrors.description = t("postjob.errors.descriptionLessThanThirty");
    }

    if (project.budget.trim() === "") {
      newErrors.budget = t("common.validation.budgetRequired");
    } else if (+project.budget < 5) {
      newErrors.budget = t("postjob.errors.budgetLessThanFive");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors({
        category_id: newErrors.category_id || "",
        title: newErrors.title || "",
        skills: newErrors.skills || "",
        experience_level: newErrors.experience_level || "",
        size: newErrors.size || "",
        duration: newErrors.duration || "",
        description: newErrors.description || "",
        budget: newErrors.budget || "",
      });
      return;
    }

    // * if no errors send the job to the backend

    // * conversion from skills as a array of objects to an array of ids
    const processedProject = {
      ...project,
      skills: project.skills.map((sk) => sk.id),
    };

    const result = await projectApi.postProject(processedProject);
    if (result.success) {
      navigate("/dashboard/client/projects");
    }
  };

  const handleRemoveSkill = (e, skillId) => {
    e.preventDefault();
    setProject((prev) => ({
      ...prev,
      skills: prev.skills.filter((sk) => +sk.id !== +skillId),
    }));
  };

  const skillsOptions = project.category_id
    ? skills.filter(
        (skill) =>
          skill.categories?.some(
            (category) => +category.id === +project.category_id,
          ) &&
          !project.skills.some(
            (selectedSkill) => +selectedSkill.id === +skill.id,
          ),
      )
    : [];

  return {
    skillsOptions,
    project,
    errors,
    handleInputChange,
    handleSubmit,
    handleRemoveSkill,
  };
}

export default usePostProjectForm;