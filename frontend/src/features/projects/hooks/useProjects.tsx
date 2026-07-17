import { useEffect, useState } from "react";
import { projectApi } from "../../../api/projects/projectApi";

export type ProjectsHookType<TProjects> = {
  projects: TProjects[];
  isLoading: boolean;
  error: string;
};

function useProjects<TProjects>(
  searchParams: URLSearchParams,
  role: string,
): ProjectsHookType<TProjects> {
  const [projects, setProjects] = useState<TProjects[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect((): void => {
    const loadProjects = async (): Promise<void> => {
      setError("");
      setIsLoading(true);
      let result = null;
      if (role === "freelancer") {
        result = await projectApi.getBrowseProjects<TProjects[]>(
          searchParams.toString(),
        );
      } else {
        result = await projectApi.getClientProjects<TProjects[]>(
          searchParams.toString(),
        );
      }
      setIsLoading(false);

      if (!result.success) {
        setError(result.message || "Error in fetching project data");
        return;
      }

      setProjects(result.data ?? []);
    };
    loadProjects();
  }, [searchParams, role]);

  return { projects, isLoading, error };
}

export default useProjects;
