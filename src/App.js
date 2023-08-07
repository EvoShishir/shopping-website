import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Login from "./Pages/Login/Login";
import Products from "./Pages/Products/Products";
import SignUp from "./Pages/SignUp/SignUp";
import Profile from "./Pages/Profile/Profile";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SingleProductPage from "./Pages/SingleProductPage/SingleProductPage";
import Cart from "./Pages/Cart/Cart";
import Payment from "./Pages/Payment/Payment";
import Checkout from "./Pages/Checkout/Checkout";
import OrderPlaced from "./Pages/OrderPlaced/OrderPlaced";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import CrudProducts from "./Pages/Admin/Products/CrudProducts";
import CrudCategories from "./Pages/Admin/Categories/CrudCategories";
import Orders from "./Pages/Admin/Orders/Orders";
import CreateProduct from "./Pages/Admin/CreateProduct/CreateProduct";
import Users from "./Pages/Admin/Users/Users";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/products",
      element: <Products />,
    },
    {
      path: "/products/:id",
      element: <SingleProductPage />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ),
    },
    {
      path: "/checkout",
      element: (
        <ProtectedRoute>
          <Checkout />
        </ProtectedRoute>
      ),
    },
    {
      path: "/payment-info",
      element: (
        <ProtectedRoute>
          <Payment />
        </ProtectedRoute>
      ),
    },
    {
      path: "/order-placed",
      element: (
        <ProtectedRoute>
          <OrderPlaced />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/users",
      element: (
        <ProtectedRoute>
          <Users />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/products",
      element: (
        <ProtectedRoute>
          <CrudProducts />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/products/create",
      element: (
        <ProtectedRoute>
          <CreateProduct />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/categories",
      element: (
        <ProtectedRoute>
          <CrudCategories />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/orders",
      element: (
        <ProtectedRoute>
          <Orders />
        </ProtectedRoute>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
