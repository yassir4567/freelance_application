import { BASE_URL, getToken } from "../config";

const getConversations = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/conversations`, {
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
        message: data.message || "get conversations failed",
      };
    }

    return {
      success: true,
      message: data.message || "Get conversations done",
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

export { getConversations };
