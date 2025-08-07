import {
  LayoutDashboard,
  MessageSquare,
  BarChart2,
  Plus,
  X,
  FileText,
  ShieldPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { user } = useSelector((state) => state.user);

  const links = [
    { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/add-blog", icon: Plus, label: "Add Blog" },
    { to: "/admin/all-blogs", icon: FileText, label: "All Blogs" },
    { to: "/admin/messages", icon: MessageSquare, label: "Messages" },
    { to: "/admin/analytics", icon: BarChart2, label: "Analytics" },
    { to: "/admin/create-new-admin", icon: ShieldPlus, label: "New Admin" },
  ];

  return (
    <aside
      className={`fixed md:relative bg-white w-64 h-screen p-4 shadow-lg z-30 top-0 left-0 transform transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="flex items-center justify-between mb-6 md:hidden">
        <h2 className="text-xl font-semibold">Blog Admin</h2>
        <button onClick={() => setSidebarOpen(false)}>
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Uncomment if you want to show avatar
      <div className="hidden md:flex items-center justify-center mb-6">
        <img
          src={user.avatar.url}
          alt="avatar"
          className="rounded-full w-24 h-24"
        />
      </div> 
      */}

      <nav className="space-y-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to}>
            {({ isActive }) => (
              <Button
                variant={isActive ? "default" : "ghost"}
                className="w-full justify-start mb-2"
              >
                <Icon className="h-5 w-5 mr-2" />
                {label}
              </Button>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
