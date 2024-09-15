import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root/Root";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Homepage from "./Pages/Homepage/Homepage";
import Authprovider from "./Authprovider/Authprovider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Authprovider element={<Homepage />} />,
      },
      { path: "/register", element: <Register></Register> },
      { path: "/login", element: <Login></Login> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
