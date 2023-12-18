import { StrictMode } from "react";
import { GlobalStyles, StyledApp } from "./App.styled";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MainPage } from "./pages/main/main";
import { ManageItems } from "./pages/manageItems/manageItems";

// commit test

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
      <StyledApp>
        <GlobalStyles />
        <RouterProvider router={router} />
      </StyledApp>
    </StrictMode>
  );
};
