import { BASE_URL, getToken } from "../config";

const getProjects = async (query) => {
  const token = getToken();
  try {
    const url = query ? `projects?${query}` : "projects";
    const response = await fetch(`${BASE_URL}/${url}`, {
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

export { getProjects };
