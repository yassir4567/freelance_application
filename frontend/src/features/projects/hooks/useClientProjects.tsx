import { useEffect, useState } from "react";
import { projectApi } from "../../../api/projects/projectApi";
import type { ClientProjectList } from "../../../types/project.types";

export type ClientProjectsHookType = {
  projects: ClientProjectList[];
  isLoading: boolean;
  error: string;
};

function useClientProjects(
  searchParams: URLSearchParams,
): ClientProjectsHookType {
  const [projects, setProjects] = useState<ClientProjectList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect((): void => {
    const loadProjects = async (): Promise<void> => {
      setError("");
      setIsLoading(true);
      let result = await projectApi.getClientProjects<ClientProjectList[]>(
        searchParams.toString(),
      );
      setIsLoading(false);

      if (!result.success) {
        setError(result.message || "Error in fetching project data");
        return;
      }

      setProjects(result.data ?? []);
    };
    loadProjects();
  }, [searchParams]);

  return { projects, isLoading, error };
}

export default useClientProjects;
