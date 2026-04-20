import { BASE_URL, getToken } from "../config";

const loginUser = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
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
      data: data,
    };
  } catch (err) {
    return {
      success: false,
      message: "Network error",
    };
  }
};

export { loginUser };
