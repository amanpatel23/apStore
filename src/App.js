import { useContext } from "react";
import { userContext } from "./context/userContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Loading from "./pages/Loading/Loading";
import Cart from "./pages/Cart/Cart";
import Order from "./pages/Order/Order";
import { productContext } from "./context/productContext";
import "./App.css";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

function App() {
  // Accessing user context
  const { isLoading } = useContext(userContext);

  // Accessing product context
  const { isProductsLoading } = useContext(productContext);

  // Render loading screen if either user or product data is loading
  if (isLoading || isProductsLoading) {
    return <Loading />;
  }

  // Create the router configuration
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <ErrorPage />, // Render the Navbar component for all routes under "/"
      children: [
        { index: true, element: <Home /> }, // Render the Home component for the root path ("/")
        { path: "/signUp", element: <SignUp /> }, // Render the SignUp component for the "/signUp" path
        { path: "/signIn", element: <SignIn /> }, // Render the SignIn component for the "/signIn" path
        { path: "/cart", element: <Cart /> }, // Render the Cart component for the "/cart" path
        { path: "/orders", element: <Order /> }, // Render the Order component for the "/orders" path
      ],
    },
  ]);

  // JSX rendering
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />{" "}
      {/* Toast notification container */}
      <RouterProvider router={router} />{" "}
      {/* RouterProvider component with the created router */}
    </>
  );
}

export default App;
