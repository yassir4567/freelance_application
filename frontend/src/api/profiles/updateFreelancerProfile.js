import { BASE_URL, getToken } from "../config";

const updateFreelancerProfile = async (form) => {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/freelancer/update-profile`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
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

export default updateFreelancerProfile;
