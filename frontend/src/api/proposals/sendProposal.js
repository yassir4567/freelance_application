import { BASE_URL, getToken } from "../config";

const sendProposal = async (projectId, formData) => {
  try {
    const token = getToken();
    const response = await fetch(
      `${BASE_URL}/projects/${projectId}/send-proposal`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(formData),
      },
    );
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Send proposal failed",
        errors: data.errors || null,
      };
    }

    return {
      success: true,
      message: data.message || "Send proposal success",
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

export { sendProposal };
