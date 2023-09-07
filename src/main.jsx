import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);

//TODO
// next.js
// Dark mode
// Accessibility
// Analytics
// Deployment & hosting (automated)
// Responsive design
// Responsive images (Source set)
// Performance optimization
// SEO
// Browser compatability
// Security
// ------ Later -------
// State managment (Redux / recoil)
// Typescript
// Testing
// Learn WebPack
