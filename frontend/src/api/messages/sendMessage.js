import { BASE_URL, getToken } from "../config";

export const sendMessage = async (conversationId, message) => {
  try {
    const token = getToken();
    const response = await fetch(
      `${BASE_URL}/conversations/${conversationId}/send-message`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          message: message,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "send messages failed",
      };
    }

    return {
      success: true,
      message: data.message || "send messages done",
      data: data.data,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message || "network err",
      errors: err,
    };
  }
};
