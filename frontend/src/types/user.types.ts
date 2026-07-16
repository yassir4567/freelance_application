export type Role = "client" | "freelancer" | "admin";

export type User = {
  id: number;
  email?: string;
  role?: Role;
  first_name?: string;
  last_name?: string;
  avatar?: string | null;
  avatar_url?: string | null;
  address?: string | null;
  country?: string | null;
};

export type Client = User & {
  created_at: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = LoginCredentials & {
  first_name: string;
  last_name: string;
  password_confirmation: string;
  role: Exclude<Role, "admin"> | "";
};
