import { BASE_URL, getToken } from "../config";

const logoutUser = async () => {
  const token = getToken();
  try {
    const response = await fetch(`${BASE_URL}/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "",
      };
    }

    return {
      success: true,
      data: data,
    };
  } catch (err) {
    return {
      success: false,
      message: "Network error",
    };
  }
};
export { logoutUser };
