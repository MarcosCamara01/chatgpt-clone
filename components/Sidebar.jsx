"use client"

import React from 'react';
import './sidebar.css'
import { IoMdAdd } from 'react-icons/io';
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';

export const Sidebar = () => {
    const handleClick = () => {
        window.location.reload();
    };

    return (
        <div className='nav-container'>
            <div className="sidebar_top">
                <a onClick={handleClick} className='sidebar-link top-component button'>
                    <IoMdAdd />
                    <span>New chat</span>
                </a>
            </div>
            <nav>
                <h3>Today</h3>
                <ul>
                    <li></li>
                </ul>
            </nav>
            <div className="sidebar_bottom">
                <a className='sidebar-link bottom-component button'>
                    <div className='left-bottom'>
                        <span>Upgrade Plan</span>
                    </div>
                    <MdOutlineWorkspacePremium />
                </a>
                <a href='https://portfoliomarcos.com/' target='_blank' className='sidebar-link bottom-component button'>
                    <div className="left-bottom">
                        <span>My portfolio</span>
                    </div>
                    <FiSettings />
                </a>
            </div>
        </div>
    )
}