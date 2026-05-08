import { BASE_URL, getToken } from "../config";

const setUpContract = async (contractId, payload) => {
  try {
    const token = getToken();
    const response = await fetch(
      `${BASE_URL}/client/contracts/${contractId}/activate`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(payload),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Activate contract Failed ",
        status : response.status ,
        errors: data.errors || null,
      };
    }

    return {
      success: true,
      message: data.message || "Activate contract success",
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

export { setUpContract };
