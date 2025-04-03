/**
 * Proyecto: EasyRental.io
 * Desarrollado por: Jose Alejandro Trejo
 * Año: 2025
 */


import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Home, Users, FileText, Settings, Calendar, Bell, Wrench, LayoutDashboard, LogOut } from "lucide-react";

const AppSidebar = () => {
  const location = useLocation();
  const { logout, isLandlord, isTenant } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const navItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
      roles: ["landlord", "tenant"],
    },
    {
      title: "Tenants",
      path: "/tenants",
      icon: <Users size={18} />,
      roles: ["landlord"],
    },
    {
      title: "Apartments",
      path: "/apartments",
      icon: <Home size={18} />,
      roles: ["landlord"],
    },
    {
      title: "Maintenance",
      path: "/maintenance",
      icon: <Wrench size={18} />,
      roles: ["landlord", "tenant"],
    },
    {
      title: "Payments",
      path: "/payments",
      icon: <FileText size={18} />,
      roles: ["landlord", "tenant"],
    },
    {
      title: "Calendar",
      path: "/calendar",
      icon: <Calendar size={18} />,
      roles: ["landlord", "tenant"],
    },
    {
      title: "Notifications",
      path: "/notifications",
      icon: <Bell size={18} />,
      roles: ["landlord", "tenant"],
    },
    {
      title: "Settings",
      path: "/settings",
      icon: <Settings size={18} />,
      roles: ["landlord", "tenant"],
    },
  ];

  const filteredNavItems = isLandlord
    ? navItems.filter((item) => item.roles.includes("landlord"))
    : isTenant
    ? navItems.filter((item) => item.roles.includes("tenant"))
    : navItems;

  return (
    <Sidebar className="border-r px-2">
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Home className="h-5 w-5 text-primary" />
          <span className="text-lg">ResidenceHub</span>
        </Link>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <nav className="grid gap-1 px-2 group py-2">
            {filteredNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:text-primary",
                  isActive(item.path)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
        </SidebarGroup>
        <div className="mt-auto px-2">
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={logout}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
