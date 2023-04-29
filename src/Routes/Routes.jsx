import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/login";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
]);
