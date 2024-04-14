import { SidebarProvider } from "@/hooks/SidebarContext";
import { isMobileDevice } from "@/libs/responsive";
import SidebarMobile from "@/components/common/sidebar-mobile";
import SidebarDesktop from "@/components/common/sidebar-desktop";

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const isMobile = await isMobileDevice();
    const initialSidebarState = isMobile ? false : true;

    return (
        <SidebarProvider initialSidebarState={initialSidebarState}>
            <SidebarDesktop />

            <SidebarMobile />

            {children}
        </SidebarProvider>
    )
}