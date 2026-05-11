import { BASE_URL, getToken } from "../config";

const addSkills = async ({ categoryId, skills }) => {
  try {
    const token = getToken();

    const response = await fetch(`${BASE_URL}/admin/skills`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({
        category_id: categoryId,
        skills,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to add skills",
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

export { addSkills };
