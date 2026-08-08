import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import FloatingLocaleSwitcher from "../components/UI/FloatingLocaleSwitcher";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-primary text-secondary transition-colors duration-200">
      <Navbar />
      <MobileNavbar />
      <Sidebar />
      <MobileSidebar />

      <main className="p-4">
        <Outlet />
      </main>

      <FloatingLocaleSwitcher />
    </div>
  );
};

export default MainLayout;
