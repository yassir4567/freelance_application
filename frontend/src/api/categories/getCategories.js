import { BASE_URL, getToken } from "../config";

const getCategories = async (filters) => {
  const token = getToken();
  try {
    const response = await fetch(`${BASE_URL}/categories`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: "Request error",
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
      message: "Network error",
      errors: err,
    };
  }
};

export { getCategories };
