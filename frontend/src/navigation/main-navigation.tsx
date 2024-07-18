import React from "react";
import Layout from "./layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/homepage/Index";
import Login from "@/pages/login/login";
import SignUp from "@/pages/signup/signup";
import Dashboard from "@/pages/dashboard/dashboard";
import Upload from "@/pages/upload/upload";
import Documents from "@/pages/documents/documents";
import Improve from "@/pages/improve/improve";
const MainNavigation = () => {
  const router = createBrowserRouter([
    {
      path: "",
      element: <HomePage />,
    },
    { path: "login", element: <Login /> },
    { path: "signup", element: <SignUp /> },
    {
      path: "dashboard",
      element: <Layout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "login", element: <Login /> },

        { path: "signup", element: <SignUp /> },
        { path: "upload", element: <Upload /> },
        { path: "documents", element: <Documents /> },
        { path: "improve/:id", element: <Improve /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default MainNavigation;
