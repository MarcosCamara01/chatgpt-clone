"use client"

import React, { useEffect, useRef } from 'react';
import '../assets/css/header.css';

export const Header = ({ isSidebarOpen, isMobile }) => {
  const header = useRef(null);
  const mainLocation = useRef(0);

  useEffect(() => {
    function handleScroll() {
        let currentOffset = window.pageYOffset;
        if (mainLocation.current >= currentOffset) {
            header.current.style.top = '0';
        } else {
            header.current.style.top = '-100px'
        }
        mainLocation.current = currentOffset;
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
}, []);

  return (
    <header ref={header} className={`${isSidebarOpen && !isMobile ? "small" : "big"}`}> 
      <span>Default (GPT-3.5)</span>
    </header>
  );
};
