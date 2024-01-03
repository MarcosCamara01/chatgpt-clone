"use client"

import React, { useEffect, useRef } from 'react';
  
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
    <header
      ref={header}
      className={`bg-[#343541] border-b border-solid border-[#2A2B32] p-2 flex items-center justify-center h-[65px] fixed top-0 right-0
        ${isSidebarOpen && !isMobile ? "small" : "big"}`}>
      <span className='text-[#D9D9E3] text-sm'>Default (GPT-3.5)</span>
    </header>
  );
};
