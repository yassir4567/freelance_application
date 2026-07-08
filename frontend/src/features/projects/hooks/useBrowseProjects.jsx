import { useEffect, useState } from "react";
import { projectApi } from "../../../api/projects/projectApi";

function useBrowseProjects(searchParams) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      const result = await projectApi.getBrowseProjects(
        searchParams.toString(),
      );
      setProjects(result.data);
    };
    loadProjects();
  }, [searchParams]);

  return { projects };
}

export default useBrowseProjects;
