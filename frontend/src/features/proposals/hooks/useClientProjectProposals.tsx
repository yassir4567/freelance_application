import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { proposalApi } from "../../../api/proposals/proposalApi";
import type { ClientProjectProposalType } from "../../../types/proposal.types";

type useClientProjectProposalsReturn = {
  proposals: ClientProjectProposalType[];
  isLoading: boolean;
  error: string;
  setProposals: Dispatch<SetStateAction<ClientProjectProposalType[]>>;
};

function useClientProjectProposals(
  projectId: string,
): useClientProjectProposalsReturn {
  const [proposals, setProposals] = useState<ClientProjectProposalType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect((): void => {
    const loadProposals = async (): Promise<void> => {
      setIsLoading(true);
      setError("");
      const result =
        await proposalApi.getClientProjectProposals<
          ClientProjectProposalType[]
        >(projectId);
      setIsLoading(false);
      if (!result.success) {
        setError(result.message || "Error in data fetching");
        return;
      }
      setProposals(result.data ?? []);
    };
    loadProposals();
  }, [projectId]);

  return { proposals, isLoading, error, setProposals };
}

export default useClientProjectProposals;
