import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { projectApi } from "../../../api/projects/projectApi";

export type ProjectHookType<TProject> = {
  project: TProject | null;
  isLoading: boolean;
  error: string;
};

function useProject<TProject>(projectId: string): ProjectHookType<TProject> {
  const [project, setProject] = useState<TProject | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect((): void => {
    const loadProject = async (): Promise<void> => {
      const response =
        await projectApi.getBrowseProjectDetail<TProject>(projectId);

      if (!response.success) {
        setError(response.message || "Error in fetching project data");
        return;
      }

      setIsLoading(false);
      setProject(response.data);
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
