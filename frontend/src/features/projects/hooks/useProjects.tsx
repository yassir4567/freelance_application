import { useEffect, useState } from "react";
import { projectApi } from "../../../api/projects/projectApi";
import type {
  BrowseProjects,
  ClientProjects,
} from "../../../types/project.types";

function useProjects(searchParams: URLSearchParams, role: string) {
  const [projects, setProjects] = useState<BrowseProjects[] | ClientProjects[] | null>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadProjects = async () => {
      setError("");
      setIsLoading(true);
      let result = null;
      if (role === "freelancer") {
        result = await projectApi.getBrowseProjects<BrowseProjects[]>(
          searchParams.toString(),
        );
      } else if (role === "client") {
        result = await projectApi.getClientProjects<ClientProjects[]>(
          searchParams.toString(),
        );
      }

      if (!result) {
        return;
      }

      if (!result.success) {
        setError(result.message || "Error in fetching project data");
        return;
      }

      setIsLoading(false);
      setProjects(result.data);
    };
    loadProjects();
  }, [searchParams, role]);

  return { projects, isLoading, error };
}

export default useProjects;
