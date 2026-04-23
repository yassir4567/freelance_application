import { BASE_URL, getToken } from "../config";

const getClientProjects = async (query) => {
  try {
    const token = getToken();
    const url = query ? `client/projects?${query}` : "client/projects";
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message,
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
      message: "Network failed",
      errors: err,
    };
  }
};

export { getClientProjects };
