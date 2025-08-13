import Header from "@/components/sub-components/Header";
import Sidebar from "@/components/sub-components/SideBar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminMainSection from "./AdminMainSection";

export default function AdminDashboard({ children }) {
  const { user } = useSelector((state) => state.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = "Admin Dashboard | Blog App";
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header setSidebarOpen={setSidebarOpen} />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto  md:px-8 max-sm:py-20 sm:py-15 px-4">
          {children}
        </main>
      </div>
    </div>
  );
}
