import { BASE_URL } from "../config";

const registerUser = async (formData) => {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "",
        errors: data.errors || null,
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

export const { registerUser };
