import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashboard from "../Pages/Dashboard/MainDashboard/MainDashboard";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>
      }
    ]
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "main",
        element: <MainDashboard></MainDashboard>
      },
      {
        path: "add-products",
        element: <AddProduct></AddProduct>
      }
    ]
  }
]);


export default router;