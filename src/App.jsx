import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ImageGet from "./ImageGet";
import ImageUpload from "./ImageUpload";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ImageUpload />,
  },
  {
    path: "/imageget",
    element: <ImageGet />,
  },

]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
