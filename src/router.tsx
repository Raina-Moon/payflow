import { createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import UsersListPage from "./pages/UsersListPage";
import UserDetailPage from "./pages/UserDetailPage";

export const router = createBrowserRouter([
  {
    element: <Header />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/users", element: <UsersListPage /> },
      { path: "/users/:id", element: <UserDetailPage /> },
    ],
  },
]);
