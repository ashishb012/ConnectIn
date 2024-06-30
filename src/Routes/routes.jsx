import { createBrowserRouter } from "react-router-dom";
import Login from "/src/Pages/Login";
import Register from "/src/Pages/Register";
import HomeLayout from "/src/layouts/HomeLayout";
import ProfileLayout from "/src/layouts/ProfileLayout";
import ConnectionLayout from "/src/layouts/ConnectionLayout";
import PasswordReset from "/src/Pages/PasswordReset";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <HomeLayout />,
  },
  {
    path: "/p/:userName",
    element: <ProfileLayout />,
  },
  {
    path: "/connections",
    element: <ConnectionLayout />,
  },
  {
    path: "/password-reset",
    element: <PasswordReset />,
  },
]);
