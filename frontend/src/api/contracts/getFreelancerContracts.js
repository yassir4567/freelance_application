import { BASE_URL, getToken } from "../config";

const getClientContracts = async (filters) => {
  try {
    const token = getToken();
    const response = await fetch(
      `${BASE_URL}/freelancer/contracts?${filters}`,
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
        message: data.message || "Error in fetching freelancer contracts",
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

export { getClientContracts };
