import { BASE_URL, getToken } from "../config";

const getDashboardStats = async () => {
  try {
    const token = getToken();

    const response = await fetch(`${BASE_URL}/admin/dashboard`, {
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
        message: data.message || "Failed to get dashboard stats",
        data: null,
      };
    }

    return {
      success: data.success,
      message: data.message,
      data: data.data,
    };
  } catch {
    return {
      success: false,
      message: "Network failed",
      data: null,
    };
  }
};

export { getDashboardStats };
