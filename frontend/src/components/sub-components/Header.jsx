import { Bell, Menu, SunDim } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileMenu from "./ProfileMenu";
import { useSelector } from "react-redux";
import NotificationDropdown from "@/pages/Notification";
import RefreshButton from "./RefreshBtn";

function Header({ setSidebarOpen }) {
  const { user } = useSelector((state) => state.user);
  return (
    <header className="fixed md:relative top-0 left-0 right-0 z-20 bg-white px-4 py-3 border-b md:border-b-1 flex justify-between items-center md:mb-6">
      <div className="flex items-center gap-4">
        <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl md:text-2xl font-bold">
          {user.name.toUpperCase()}
        </h1>
      </div>
      <div className="flex items-center gap-4 sm:mr-10">
        <Button variant="ghost" size="icon" className="bg-gray-50">
          <NotificationDropdown>
            <Bell />
          </NotificationDropdown>
        </Button>
        {/* <Button variant="ghost" size="icon" className="bg-gray-50">
          <SunDim />
        </Button> */}

        <RefreshButton/>

        <ProfileMenu>
          <Avatar>
            <AvatarImage src={user.avatar?.url} />
            <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
          </Avatar>
        </ProfileMenu>
        
      </div>
    </header>
  );
}

export default Header;
