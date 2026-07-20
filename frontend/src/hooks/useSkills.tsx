import { useEffect, useState } from "react";
import { skillApi } from "../api/skills/skillApi";
import type { Skill } from "../types/skill.types";

export type SkillHookType = {
  skills: Skill[];
  isLoading: boolean;
  error: string;
};
function useSkills(): SkillHookType {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect((): void => {
    const loadSkills = async (): Promise<void> => {
      setIsLoading(true);
      const result = await skillApi.getSkills<Skill[]>();

      setIsLoading(false);
      if (!result.success) {
        setError(result.message || "Error in fetching categories");
        return;
      }

      const skillsHadCategory = (result.data ?? []).filter(
        (res) => res.categories.length > 0,
      );
      setSkills(skillsHadCategory);
    };
    loadSkills();
  }, []);

  return { skills, isLoading, error };
}

export default useSkills;
