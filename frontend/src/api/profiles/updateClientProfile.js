import { BASE_URL, getToken } from "../config";

const updateClientProfile = async (payload) => {
  try {
    const token = getToken();
    payload.set("_method", "PUT");

    const response = await fetch(`${BASE_URL}/client/update-profile`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: payload
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed update profile",
        errors: data.errors,
      };
    }

    return {
      success: true,
      message: data.message || "Update profile successfully",
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

export default updateClientProfile;
