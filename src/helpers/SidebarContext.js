import React, { createContext, useContext, useState, useEffect } from 'react';
import { useClientMediaQuery } from '../hooks/useClientMediaQuery'; // Asegúrate de importar useClientMediaQuery

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const isMobile = useClientMediaQuery('(max-width: 600px)');

    useEffect(() => {
        if (isMobile) {
            setSidebarOpen(false);
        } else {
            setSidebarOpen(true);
        }
    }, [isMobile, setSidebarOpen]);

    return (
        <SidebarContext.Provider value={{ isSidebarOpen, setSidebarOpen, isMobile }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);
