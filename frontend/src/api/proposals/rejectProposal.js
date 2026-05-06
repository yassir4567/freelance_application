import { BASE_URL, getToken } from "../config";

const rejectProposal = async (projectId, proposalId) => {
  try {
    const token = getToken();
    const response = await fetch(
      `${BASE_URL}/client/projects/${projectId}/proposals/${proposalId}/reject`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      },
    );
    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "response error",
      };
    }

    return {
      success: true,
      message: data.message || "Proposal accepted",
      data: data.data,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message || "Network error",
      errors: err,
    };
  }
};

export { rejectProposal };
