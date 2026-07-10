const BASE_URL: string = "http://127.0.0.1:8000/api";

type ValidationErrors = Record<string, string[]>;

type ApiSuccess<T> = {
  success: true;
  message?: string;
  data: T | null;
};

type ApiError = {
  success: false;
  status: number;
  message: string;
  errors: ValidationErrors | null;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

type LaravelResponse<T> = {
  message?: string;
  success?: boolean;
  errors?: ValidationErrors | null;
  data?: T;
};

function getToken(): string | null {
  return localStorage.getItem("token");
}

async function request<T = unknown>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  
  const token = getToken();

  const headers = new Headers(options.headers);

  headers.set("Accept", "application/json");

  const hasBody = options.body !== undefined;

  if (hasBody && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  let data: LaravelResponse<T> = await response.json();

  if (!response.ok) {
    return {
      success: false,
      status: response.status,
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
