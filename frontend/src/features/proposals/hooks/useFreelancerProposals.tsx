import { useEffect, useState } from "react";
import { proposalApi } from "../../../api/proposals/proposalApi";
import type { FreelancerProposalType } from "../../../types/proposal.types";


type useFreelancerProposalsReturn = {
  proposals: FreelancerProposalType[];
  isLoading: boolean;
  error: string;
};

function useFreelancerProposals(query: string): useFreelancerProposalsReturn {
  const [proposals, setProposals] = useState<FreelancerProposalType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect((): void => {
    const loadProposals = async (): Promise<void> => {
      setIsLoading(true);
      setError("");
      const result = await proposalApi.getFreelancerProposals<
        FreelancerProposalType[]
      >(
        query,
      );
      setIsLoading(false);
      if (!result.success) {
        setError(result.message || "Error in fetching data");
        return;
      }

      setProposals(result.data ?? []);
    };
    loadProposals();
  }, [query]);

  return { proposals, isLoading, error };
}

export default useFreelancerProposals;
