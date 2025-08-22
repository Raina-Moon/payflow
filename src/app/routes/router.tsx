import { createBrowserRouter } from "react-router-dom";
import Header from "../components/Header";
import HomePage from "../../features/home/pages/HomePage";
import UsersListPage from "../../features/user/pages/UsersListPage";
import UserDetailPage from "../../features/user/pages/UserDetailPage";
import ProductDetailPage from "../../features/products/pages/ProductDetailPage";

export const router = createBrowserRouter([
  {
    element: <Header />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/users", element: <UsersListPage /> },
      { path: "/users/:id", element: <UserDetailPage /> },
      { path: "/products/:id", element: <ProductDetailPage /> },
    ],
  },
]);
