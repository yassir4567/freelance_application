import { BASE_URL, getToken } from "../config";

const getClientProjectProposals = async (id) => {
  try {
    const token = getToken();
    const response = await fetch(
      `${BASE_URL}/client/projects/${id}/proposals`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      },
    );
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "response error",
      };
    }

    return {
      success: true,
      message: data.message,
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

export { getClientProjectProposals };
