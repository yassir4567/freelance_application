import { useEffect, useState } from "react";
import { projectApi } from "../../../api/projects/projectApi";
import type { Freelancer } from "../../../types/user.types";
import type { Project } from "../../../types/project.types";
import type { Category } from "../../../types/category.type";
import type { Skill } from "../../../types/skill.type";

export type AssignedFreelancerType = Pick<
  Freelancer,
  "id" | "user_id" | "first_name" | "last_name" | "title"
> & {
  category: Category;
  skills: Pick<Skill, "id" | "name">[];
};

export type ClientProjectDataType = {
  project: Project;
  freelancer?: AssignedFreelancerType;
};

export type ClientProjectHookType = {
  project: ClientProjectDataType | null;
  isLoading: boolean;
  error: string;
};

function useClientProject(projectId: string): ClientProjectHookType {
  const [project, setProject] = useState<ClientProjectDataType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect((): void => {
    const loadProject = async (): Promise<void> => {
      setError("");
      setIsLoading(true);
      let result =
        await projectApi.getClientProjectDetail<ClientProjectDataType>(
          projectId,
        );

      setIsLoading(false);
      if (!result.success) {
        setError(result.message || "Error in fetching project data");
        return;
      }
      setProject(result.data);
    };
    loadProject();
  }, [projectId]);

  return {
    project,
    isLoading,
    error,
  };
}

export default useClientProject;
