import { useState } from "react";
import useSkills, { type SkillHookType } from "../../../hooks/useSkills";
import { useTranslation } from "react-i18next";
import { projectApi } from "../../../api/projects/projectApi";
import { useNavigate } from "react-router-dom";
import type { Skill } from "../../../types/skill.types";
import type {
  Project,
  ProjectDuration,
  ProjectExperienceLevel,
  ProjectSize,
} from "../../../types/project.types";

type PostProject = {
  title: string;
  category_id: string;
  experience_level: ProjectExperienceLevel | "";
  size: ProjectSize | "";
  duration: ProjectDuration | "";
  description: string;
  budget: string;
  skills: Skill[];
};

type ProjectErrors = Partial<Record<keyof PostProject, string>>;

const initProject: PostProject = {
  title: "",
  category_id: "",
  skills: [],
  experience_level: "",
  size: "",
  duration: "",
  description: "",
  budget: "",
};

const initErrors: ProjectErrors = {
  category_id: "",
  title: "",
  skills: "",
  experience_level: "",
  size: "",
  duration: "",
  description: "",
  budget: "",
};

export type UsePostProjectFormReturn = {
  skillsOptions: Skill[];
  project: PostProject;
  errors: ProjectErrors;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  handleSubmit: (e: React.SubmitEvent) => Promise<void>;
  handleRemoveSkill: (
    e: React.MouseEvent<HTMLButtonElement>,
    skillId: number,
  ) => void;
};

type CreateProjectPayload = Omit<PostProject, "skills"> & {
  skills: number[];
};

function usePostProjectForm(): UsePostProjectFormReturn {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [project, setProject] = useState<PostProject>(initProject);
  const [errors, setErrors] = useState<ProjectErrors>(initErrors);
  const { skills } = useSkills();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ): void => {
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

  const handleSubmit = async (e: React.SubmitEvent): Promise<void> => {
    e.preventDefault();

    setErrors({});
    const newErrors: ProjectErrors = {};

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
    const processedProject: CreateProjectPayload = {
      ...project,
      skills: project.skills.map((sk) => +sk.id),
    };

    const result = await projectApi.postProject<Project, CreateProjectPayload>(
      processedProject,
    );
    if (result.success) {
      navigate("/dashboard/client/projects");
    }
  };

  const handleRemoveSkill = (
    e: React.MouseEvent<HTMLButtonElement>,
    skillId: number,
  ): void => {
    e.preventDefault();
    setProject((prev) => ({
      ...prev,
      skills: prev.skills.filter((sk) => +sk.id !== +skillId),
    }));
  };

  const skillsOptions: Skill[] = project.category_id
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
