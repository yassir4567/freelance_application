import { BASE_URL, getToken } from "../config";

const leaveFeedback = async (contractId, formData) => {
  try {
    const token = getToken();

    const response = await fetch(`${BASE_URL}/leave-feedback/${contractId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    console.log(data);
    
    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: data.message || "Something error",
      };
    }

    return {
      success: true,
      message: data.message || "feedback leaved successefuly",
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

export { leaveFeedback };
