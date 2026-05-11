import { BASE_URL, getToken } from "../config";

const getUserDetails = async (userId) => {
  try {
    const token = getToken();

    const response = await fetch(`${BASE_URL}/admin/users/${userId}`, {
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
        message: data.message || "Failed to get user details",
        data: null,
      };
    }

    return {
      success: data.success,
      message: data.message,
      data: data.data?.user || data.data || null,
    };
  } catch {
    return {
      success: false,
      message: "Network failed",
      data: null,
    };
  }
};

export { getUserDetails };
