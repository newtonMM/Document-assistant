import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import IsAuth from "@/middleware/isAuth";

function Layout() {
  return (
    <>
      <IsAuth />
      <div className="w-full flex ">
        <div className="w-[20%]">
          <Sidebar />
        </div>
        <div className="w-[80%]">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
