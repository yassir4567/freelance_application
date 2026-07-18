import { useEffect, useState } from "react";
import { projectApi } from "../../../api/projects/projectApi";
import type { BrowseProject } from "../../../types/project.types";

export type BrowseProjectsHookType = {
  projects: BrowseProject[];
  isLoading: boolean;
  error: string;
};

function useBrowseProjects(
  searchParams: URLSearchParams,
): BrowseProjectsHookType {
  const [projects, setProjects] = useState<BrowseProject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect((): void => {
    const loadProjects = async (): Promise<void> => {
      setError("");
      setIsLoading(true);
      let result = await projectApi.getBrowseProjects<BrowseProject[]>(
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

export default useBrowseProjects;
