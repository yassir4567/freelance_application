import { BASE_URL, getToken } from "../config";
import { getConversations } from "./getConversations";

const getMessages = async (conversationId) => {
  try {
    const token = getToken();
    const response = await fetch(
      `${BASE_URL}/conversations/${conversationId}/messages`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "get conversation messages failed",
      };
    }

    return {
      success: true,
      message: data.message || "Get conversation messages done",
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

export { getMessages };
