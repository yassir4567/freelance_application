import { BASE_URL, getToken } from "../config";

const getCurrentUser = async () => {
  try {
    const token = getToken();

    const response = await fetch(`${BASE_URL}/me`, {
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
        message: data.message || "",
      };
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (err) {
    return {
      success: false,
      message: "Network error",
    };
  }
};

export { getCurrentUser };
