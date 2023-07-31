"use client"

import React from 'react';
import '../assets/css/sidebar.css'
import { IoMdAdd } from 'react-icons/io';
import { FiSettings, FiSidebar } from 'react-icons/fi';

export const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
    const handleClick = () => {
        window.location.reload();
    };

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <div className={`nav-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-close'}`}>
                <div className="sidebar_top">
                    <a onClick={handleClick} className='sidebar-link top-component button'>
                        <IoMdAdd />
                        <span>New chat</span>
                    </a>
                    <button className='top-component button' onClick={toggleSidebar}>
                        <FiSidebar />
                    </button>
                </div>
                <nav>
                    <h3>Today</h3>
                    <ul>
                        <li></li>
                    </ul>
                </nav>
                <div className="sidebar_bottom">
                    <a href='https://portfoliomarcos.com/' target='_blank' className='sidebar-link bottom-component button'>
                        <div className="left-bottom">
                            <span>My portfolio</span>
                        </div>
                        <FiSettings />
                    </a>
                </div>
            </div>

            {!isSidebarOpen && (
                <button className='sidebarclose-btn' onClick={toggleSidebar}>
                    <FiSidebar />
                </button>
            )}
        </>
    )
}