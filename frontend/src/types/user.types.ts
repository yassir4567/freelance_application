export type Role = "client" | "freelancer" | "admin";

export type User = {
  id: number;
  email: string;
  phone: string;
  role: Role;
  first_name: string;
  last_name: string;
  avatar: string | null;
  avatar_url: string | null;
  address: string | null;
  country: string | null;
  city: string | null;
  created_at: string;
};

export type Freelancer = User & {
  id: number;
  user_id: number;
  category_id: number;
  title: string;
  bio: string;
  portfolio_url: string;
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
