import { BASE_URL, getToken } from "../config";

const getClientContractStats = async () => {
  try {
    const token = getToken();
    const response = await fetch(
      `${BASE_URL}/client/contracts/stats`,
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
        message: data.message || "Error in fetching client contracts stats",
      };
    }

    return {
      success: true,
      message: data.message || "success",
      data: data.data,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message || "Network err",
      errors: err,
    };
  }
};

export { getClientContractStats };
