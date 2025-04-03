/**
 * Proyecto: EasyRental.io
 * Desarrollado por: Jose Alejandro Trejo
 * Año: 2025
 */


import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";

const AppLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Outlet />;
  }

  return (
    <SidebarProvider>
      <div className="app-container">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <AppHeader />
          <main className="content-area">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
