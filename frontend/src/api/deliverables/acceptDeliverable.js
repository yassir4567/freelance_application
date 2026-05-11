import { BASE_URL, getToken } from "../config";

export const acceptDeliverable = async (deliverableId) => {
  try {
    const token = getToken();
    const response = await fetch(
      `${BASE_URL}/deliverables/${deliverableId}/accept`,
      {
        method: "PUT",
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
        message: data.message || "Accept deliverable failed",
        errors: data.errors || null,
        status: response.status || null,
      };
    }

    return {
      success: true,
      message: data.message || "Deliverable accepted successfully",
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
