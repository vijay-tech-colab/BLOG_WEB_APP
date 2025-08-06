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
import { Link } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { user } = useSelector((state) => state.user);
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
      {/* <div className="hidden md:flex items-center justify-center mb-6">
        <div>
          <img
            src={user.avatar.url}
            alt=""
            className="rounded-full w-30 h-30"
          />
        </div>
      </div> */}
      <nav className="space-y-4 ">
        <Link to="/admin">
          <Button variant="ghost" className="w-full justify-start mb-3">
            <LayoutDashboard className="h-5 w-5 mr-2" /> Dashboard
          </Button>
        </Link>
        <Link to="/admin">
          <Button variant="ghost" className="w-full justify-start mb-3">
            <Plus className="h-5 w-5 mr-2" /> Add Blog
          </Button>
        </Link>
        <Link to="/admin">
          <Button variant="ghost" className="w-full justify-start mb-3">
            <FileText className="h-5 w-5 mr-2" /> All Blogs
          </Button>
        </Link>
        <Link to="/admin">
          <Button variant="ghost" className="w-full justify-start mb-3">
            <MessageSquare className="h-5 w-5 mr-2" /> Messages
          </Button>
        </Link>
        <Link to="/admin/alalystics">
          <Button variant="ghost" className="w-full justify-start mb-3">
            <BarChart2 className="h-5 w-5 mr-2" /> Analytics
          </Button>
        </Link>
        <Link to="/admin/create-new-admin">
          <Button variant="ghost" className="w-full justify-start mb-3">
            <ShieldPlus className="h-5 w-5 mr-2" /> New Admin
          </Button>
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
