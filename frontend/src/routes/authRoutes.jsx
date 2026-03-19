import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";

const authRouter = [
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
    ],
  },
];

export default authRouter 