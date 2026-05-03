import { BASE_URL, getToken } from "../config";

const registerUser = async (formData) => {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(formData),
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
      data: data.data,
    };
  } catch (err) {
    console.log(err);
    
    return {
      success: false,
      message: "Network error",
    };
  }
};

export { registerUser };
