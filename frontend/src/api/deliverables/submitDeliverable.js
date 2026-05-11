import { BASE_URL, getToken } from "../config";

export const submitDeliverable = async (formData, deliverableId) => {
  try {
    const token = getToken();
    const response = await fetch(
      `${BASE_URL}/deliverables/${deliverableId}/submit`,
      {
        method: "PUT",
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
        message: data.message || "success",
        errors: data.errors || null,
        status: response.status || null,
      };
    }

    return {
      success: true,
      message: data.message || "success",
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
