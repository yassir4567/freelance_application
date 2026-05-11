import { BASE_URL, getToken } from "../config";

const addCategory = async (name) => {
  try {
    const token = getToken();

    const response = await fetch(`${BASE_URL}/admin/categories`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ name }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to add category",
        errors: data.errors || {},
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
      errors: {},
      data: null,
    };
  }
};

export { addCategory };
