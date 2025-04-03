/**
 * Proyecto: EasyRental.io
 * Desarrollado por: Jose Alejandro Trejo
 * Año: 2025
 */


import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Bell, Menu } from "lucide-react";
import AppAvatar from "../AppAvatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { mockNotifications } from "@/mockData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotificationItem from "../NotificationItem";
import { Link } from "react-router-dom";

const AppHeader = () => {
  const { user } = useAuth();
  
  // Filter notifications for the current user
  const userNotifications = mockNotifications.filter(
    (notification) => notification.userId === user?.id
  );
  
  // Count unread notifications
  const unreadCount = userNotifications.filter(
    (notification) => !notification.isRead
  ).length;

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
      <SidebarTrigger className="lg:hidden">
        <Menu className="h-6 w-6" />
      </SidebarTrigger>
      
      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-y-auto">
              {userNotifications.length > 0 ? (
                userNotifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="p-0 focus:bg-background">
                    <NotificationItem notification={notification} />
                  </DropdownMenuItem>
                ))
              ) : (
                <div className="py-2 px-3 text-sm text-muted-foreground">
                  No notifications
                </div>
              )}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="justify-center text-center">
              <Link to="/notifications">View all notifications</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative h-8 flex items-center gap-2">
              <AppAvatar
                src={user?.avatar}
                fallback={user?.name || "User"}
                size="sm"
              />
              <span className="hidden md:inline-block text-sm font-medium">
                {user?.name}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {}}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AppHeader;
