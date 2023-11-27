import { StrictMode } from "react";
import { ResetStyles } from "./App.styled";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MainPage } from "./pages/main/main";
import { ManageItems } from "./pages/manageItems/manageItems";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/items",
    element: <ManageItems />,
  },
]);

export const App = () => {
  return (
    <StrictMode>
      <ResetStyles />
      <RouterProvider router={router} />
    </StrictMode>
  );
};
