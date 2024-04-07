import Sidebar from "@/components/common/Sidebar";
import { SidebarProvider } from "@/hooks/SidebarContext";
import { getChats } from "../actions";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { isMobileDevice } from "@/libs/responsive";

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session: Session | null = await getServerSession(authOptions);
    const isMobile = await isMobileDevice();
    const initialSidebarState = isMobile ? false : true;
    const response = await getChats();
    const stringResponse = JSON.stringify(response.chat);

    return (
        <SidebarProvider initialSidebarState={initialSidebarState}>
            <Sidebar
                isMobile={isMobile}
                session={session}
                stringResponse={stringResponse}
            />
            {children}
        </SidebarProvider>
    )
}