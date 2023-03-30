import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Login from "./Pages/Login/Login";
import Logout from "./Pages/Logout/Logout";
import Products from "./Pages/Products/Products";
import SignUp from "./Pages/SignUp/SignUp";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage></HomePage> },
    {
      path: "/sign-up",
      element: <SignUp></SignUp>,
    },
    {
      path: "/login",
      element: <Login></Login>,
    },
    {
      path: "/logout",
      element: <Logout></Logout>,
    },
    {
      path: "/products",
      element: <Products></Products>,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
