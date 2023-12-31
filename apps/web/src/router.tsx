import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login";
import Register from "./pages/Register/Register";
import { Home } from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: "/login",
    element:
        <Login />
  },
  {
    path: "/register",
    element:

        <Register />,

  },
  {
    path: "/",
    element: <Home />

  }
]);
