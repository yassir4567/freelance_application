import { BASE_URL, getToken } from "../config";

const getClientProjectDetail = async (id) => {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/client/projects/${id}`, {
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
        status: response.status,
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

export { getClientProjectDetail };
