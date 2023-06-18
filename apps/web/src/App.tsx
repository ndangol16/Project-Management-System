import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./styles/globals.css";
import { AuthProvider } from "./context/auth";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AuthProvider>
      <RouterProvider router={router} />

      </AuthProvider>
    </>
  );
}

export default App;
