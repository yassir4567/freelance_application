import { useEffect, useState } from "react";
import { projectApi } from "../../../api/projects/projectApi";
import type { BrowseProject } from "../../../types/project.types";
import type { User } from "../../../types/user.types";

type ClientProjectType = Pick<
  User,
  "id" | "first_name" | "last_name" | "country" | "address" | "created_at"
>;

type ProjectDataType = {
  project: BrowseProject;
  client: ClientProjectType;
  client_projects_count: number;
  is_proposal_sent: boolean;
};

export type BrowseProjectHookType = {
  project: ProjectDataType | null;
  isLoading: boolean;
  error: string;
};

function useBrowseProject(projectId: string): BrowseProjectHookType {
  const [project, setProject] = useState<ProjectDataType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect((): void => {
    const loadProject = async (): Promise<void> => {
      setError("");
      setIsLoading(true);
      let result =
        await projectApi.getBrowseProjectDetail<ProjectDataType>(projectId);

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

export default useBrowseProject;
