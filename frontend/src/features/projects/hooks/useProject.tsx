import { useEffect, useState } from "react";
import { projectApi } from "../../../api/projects/projectApi";
import type { Role } from "../../../types/user.types";

export type ProjectHookType<TProject> = {
  project: TProject | null;
  isLoading: boolean;
  error: string;
};

function useProject<TProject>(
  projectId: string,
  role: Omit<Role, "admin">,
): ProjectHookType<TProject> {
  const [project, setProject] = useState<TProject | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect((): void => {
    const loadProject = async (): Promise<void> => {
      setError("");
      setIsLoading(true);
      let result = null;
      if (role == "freelancer") {
        result = await projectApi.getBrowseProjectDetail<TProject>(projectId);
      } else {
        result = await projectApi.getClientProjectDetail<TProject>(projectId);
      }

      setIsLoading(false);
      if (!result.success) {
        setError(result.message || "Error in fetching project data");
        return;
      }
      setProject(result.data);
    };
    loadProject();
  }, []);

  return {
    project,
    isLoading,
    error,
  };
}

export default useProject;
