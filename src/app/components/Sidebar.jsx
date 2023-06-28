"use client"

import React, { useEffect, useState } from 'react';
import './sidebar.css'
import { IoMdAdd } from 'react-icons/io';
import { AiOutlineUser } from 'react-icons/ai';
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { FiSidebar } from 'react-icons/fi';

export const Sidebar = () => {

    return (
        <div className='nav-container'>
            <div className="sidebar_top">
                <a className='sidebar-link top-component button'>
                    <IoMdAdd />
                    <span>New chat</span>
                </a>
                <button className='top-component button'><FiSidebar /></button>
            </div>
            <nav>
                <h3>Summaries</h3>
                <ul>
                    <li></li>
                </ul>
            </nav>
            <div className="sidebar_bottom">
                <a className='sidebar-link bottom-component button'>
                    <div className='left-bottom'>
                        <AiOutlineUser />
                        <span>Upgrade Plan</span>
                    </div>
                    <MdOutlineWorkspacePremium />
                </a>
                <a className='sidebar-link bottom-component button'>
                    <div className="left-bottom">
                        <AiOutlineUser />
                        <span>Name Name</span>
                    </div>
                    <FiSettings />
                </a>
            </div>
        </div>
    )
}