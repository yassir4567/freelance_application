const BASE_URL = "http://127.0.0.1:8000/api";

function getToken() {
  return localStorage.getItem("token");
}

async function request(endpoint, options = {}) {
  const token = getToken();

  const headers = {
    Accept: "application/json",
    ...options.headers,
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const reponse = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await reponse.json();

  if (!reponse.ok) {
    return {
      success: false,
      status: reponse.status,
      message: data?.message || "Something wrong",
      errors: data?.errors || null,
    };
  }

  return {
    success: true,
    message: data?.message || "Success",
    data: data.data || null,
  };
}

export { BASE_URL, getToken, request };
