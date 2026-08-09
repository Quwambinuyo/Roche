import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileNavbar from "./MobileNavbar";
import MobileSidebar from "./MobileSidebar";

const AdminLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-secondary">
      <Sidebar />

      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <MobileNavbar onMenuClick={() => setIsMobileSidebarOpen(true)} />

        <div className="hidden md:block border border-primary/5">
          <Topbar />
        </div>

        <main className="flex-1 overflow-y-auto p-6 bg-secondary text-primary ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
