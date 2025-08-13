// components/NotificationDropdown.js
import { useEffect, useState } from "react";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
const NotificationDropdown = ({children}) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("/api/notifications"); // Adjust URL as needed
      setNotifications(res.data.notifications || []);
      setUnreadCount(res.data.notifications.filter((n) => !n.isRead).length);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.patch(`/api/notifications/${id}/read`);
      fetchNotifications(); // Refresh after marking read
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative">
          {children}
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute top-0 right-0 h-4 w-4 p-0 text-[10px] rounded-full"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-96 max-h-96 overflow-y-auto">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {notifications.length === 0 ? (
          <DropdownMenuItem disabled>No notifications</DropdownMenuItem>
        ) : (
          notifications.map((notif) => (
            <DropdownMenuItem
              key={notif._id}
              className={`flex flex-col gap-1 ${
                !notif.isRead ? "bg-muted font-semibold" : ""
              }`}
              onClick={() => markAsRead(notif._id)}
            >
              <span className="capitalize">{notif.type.replace("_", " ")}</span>
              <span className="text-sm text-gray-600">{notif.message}</span>
              <span className="text-xs text-gray-400">{new Date(notif.createdAt).toLocaleString()}</span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
