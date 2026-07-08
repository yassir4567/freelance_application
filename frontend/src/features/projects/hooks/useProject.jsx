import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { projectApi } from "../../../api/projects/projectApi";

function useProject() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      const response = await projectApi.getBrowseProjectDetail(projectId);
      if (response.success) {
        setProject(response.data);
      }
    };
    loadProject();
  }, []);

  const client = project?.project?.client;

  return {
    project,
    client,
    projectId,
  };
}

export default useProject;
