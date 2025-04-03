/**
 * Proyecto: EasyRental.io
 * Desarrollado por: Jose Alejandro Trejo
 * Año: 2025
 */


import { Bell } from "lucide-react";
import { Notification } from "../types";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface NotificationItemProps {
  notification: Notification;
  onRead?: (id: string) => void;
}

const NotificationItem = ({ notification, onRead }: NotificationItemProps) => {
  const getTypeIcon = () => {
    switch (notification.type) {
      case "warning":
        return <Bell className="h-4 w-4 text-amber-500" />;
      case "success":
        return <Bell className="h-4 w-4 text-green-500" />;
      case "error":
        return <Bell className="h-4 w-4 text-red-500" />;
      case "info":
      default:
        return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  const handleClick = () => {
    if (!notification.isRead && onRead) {
      onRead(notification.id);
    }
  };

  const content = (
    <div
      className={cn(
        "flex items-start gap-3 rounded-md p-3 transition-colors",
        notification.isRead
          ? "bg-background"
          : "bg-muted/50 hover:bg-muted/80 cursor-pointer"
      )}
      onClick={handleClick}
    >
      <div className="mt-1">{getTypeIcon()}</div>
      <div className="flex-1">
        <div className="font-medium">{notification.title}</div>
        <div className="text-sm text-muted-foreground">{notification.message}</div>
        <div className="mt-1 text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
        </div>
      </div>
    </div>
  );

  if (notification.linkTo) {
    return <Link to={notification.linkTo}>{content}</Link>;
  }

  return content;
};

export default NotificationItem;
