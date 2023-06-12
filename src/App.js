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

function App() {
  const { isLoading } = useContext(userContext);
  const { isProductsLoading } = useContext(productContext);


  if (isLoading || isProductsLoading) {
    return <Loading />
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { index: true, element: <Home /> },
        { path: "/signUp", element: <SignUp /> },
        { path: "/signIn", element: <SignIn /> },
        { path: "/cart", element: <Cart />},
        {path: "/orders", element: <Order />}
      ],
    },
  ]);
  return (
    <>
        <ToastContainer position="top-right" autoClose={3000} />
        <RouterProvider router={router} />
    </>
  );
}

export default App;
