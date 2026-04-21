import { BASE_URL, getToken } from "../config";

const getDashboardData = async (role) => {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/${role}/dashboard`, {
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
      data: data.data,
    };
  } catch (err) {
    return {
      success: false,
      message: "Network failed",
    };
  }
};

export { getDashboardData };
