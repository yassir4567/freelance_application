import { BASE_URL, getToken } from "../config";

const getAdminCategories = async () => {
  try {
    const token = getToken();

    const response = await fetch(`${BASE_URL}/admin/categories`, {
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
        message: data.message || "Failed to get categories",
        data: [],
      };
    }

    return {
      success: data.success,
      message: data.message,
      data: data.data || [],
    };
  } catch {
    return {
      success: false,
      message: "Network failed",
      data: [],
    };
  }
};

export { getAdminCategories };
