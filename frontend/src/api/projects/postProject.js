import { BASE_URL, getToken } from "../config";

const postProject = async (form) => {
  const token = getToken();
  try {
    const response = await fetch(`${BASE_URL}/api/client/create-project`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "fetch error",
      };
    }

    return {
      success: true,
      message: data.message || "project created successfully",
      data: data.data,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message || "Network error",
      errors: err,
    };
  }
};
