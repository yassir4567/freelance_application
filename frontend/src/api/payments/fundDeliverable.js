import { BASE_URL, getToken } from "../config";

export const fundDeliverable = async (formData, deliverableId) => {
  try {
    const token = getToken();
    const response = await fetch(
      `${BASE_URL}/deliverables/${deliverableId}/payments/fund`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(formData),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: data.message || "Fund deliverable failed",
        errors: data.errors || null,
      };
    }

    return {
      success: true,
      message: data.message || "Success",
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
