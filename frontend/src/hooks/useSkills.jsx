import { useEffect, useState } from "react";
import { skillApi } from "../api/skills/skillApi";

function useSkills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const loadSkills = async () => {
      const result = await skillApi.getSkills();
      const skillsHadCategory = result.data.filter(
        (res) => res.categories.length > 0,
      );
      setSkills(skillsHadCategory);
    };
    loadSkills();
  }, []);

  return { skills };
}

export default useSkills;
