import { BASE_URL, getToken } from "../config";

const getClientContractDetail = async (id) => {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/client/contracts/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message,
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
      message: "Network failed",
      errors: err,
    };
  }
};

export { getClientContractDetail };
