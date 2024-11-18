import { AppSidebar } from "@/components/AppSidebar";
import { SidebarInset, SidebarProvider } from "@repo/ui";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const AppLayout = () => {
  const location = useLocation();

  if (location.pathname === "/app")
    return <Navigate to="/app/root-annotator" replace />;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="max-h-svh">
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
};
