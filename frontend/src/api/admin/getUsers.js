import { BASE_URL, getToken } from "../config";

const getUsers = async ({ role = "", search = "" } = {}) => {
  try {
    const token = getToken();
    const params = new URLSearchParams();

    if (role) {
      params.append("role", role);
    }

    if (search) {
      params.append("search", search);
    }

    const queryString = params.toString();
    const url = queryString
      ? `${BASE_URL}/admin/users?${queryString}`
      : `${BASE_URL}/admin/users`;

    const response = await fetch(url, {
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
        message: data.message || "Failed to get users",
        data: [],
      };
    }

    return {
      success: data.success,
      message: data.message,
      data: data.data?.users || data.data || [],
    };
  } catch {
    return {
      success: false,
      message: "Network failed",
      data: [],
    };
  }
};

export { getUsers };
