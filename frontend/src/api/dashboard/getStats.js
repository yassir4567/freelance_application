import { BASE_URL, getToken } from "../config";

const getStats = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/dashboard-stats`, {
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
      };
    }

    return {
      success: data.success,
      message: data.message,
      stats: data.data,
    };
  } catch (err) {
    return {
      success: false,
      message: "Network failed",
    };
  }
};

export { getStats };
