import { SidebarProvider } from "@/hooks/SidebarContext";
import SidebarMobile from "@/components/common/sidebar-mobile";
import SidebarDesktop from "@/components/common/sidebar-desktop";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SidebarDesktop />

      <SidebarMobile />

      {children}
    </SidebarProvider>
  );
}
