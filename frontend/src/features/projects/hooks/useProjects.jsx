import { useEffect, useState } from "react";
import { projectApi } from "../../../api/projects/projectApi";

function useProjects(searchParams, role) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      let result;
      if (role === "freelancer") {
        result = await projectApi.getBrowseProjects(searchParams.toString());
      } else if (role === "client") {
        result = await projectApi.getClientProjects(searchParams.toString());
      }

      setProjects(result.data);
    };
    loadProjects();
  }, [searchParams, role]);

  return { projects };
}

export default useProjects;
